from collections.abc import AsyncIterator, Callable
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from sqlalchemy.orm import Session

from database import get_db, init_db
from models import Expense, ExpenseStatus, Invoice, InvoiceStatus, Pme, User, UserRole
from schemas import (
    ExpenseCategoryRead,
    ExpenseCreate,
    ExpenseDecision,
    ExpenseRead,
    InvoiceCreate,
    InvoiceRead,
    LoginRequest,
    PmeRead,
    UserRead,
)


DEFAULT_EXPENSE_CATEGORIES = ["Fournitures", "Logiciel", "Transport", "Reception", "Autre"]
DEMO_PASSWORD = "demo1234"


def get_current_user(x_user_email: str | None = Header(default=None), db: Session = Depends(get_db)) -> User:
    if x_user_email is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Utilisateur non authentifie")

    user = db.query(User).filter(User.email == x_user_email).one_or_none()

    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Utilisateur inconnu")

    return user


def require_roles(*allowed_roles: UserRole) -> Callable[[User], User]:
    def role_dependency(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in allowed_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Action non autorisee pour ce role")

        return current_user

    return role_dependency


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    init_db()
    yield


app = FastAPI(
    title="FinSmart Pro API",
    description="API backend pour la plateforme SaaS FinSmart Pro.",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Bienvenue sur l'API FinSmart Pro"}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/auth/login", response_model=UserRead)
def login(credentials: LoginRequest, db: Session = Depends(get_db)) -> User:
    user = db.query(User).filter(User.email == credentials.email).one_or_none()

    if user is None or credentials.password != DEMO_PASSWORD:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Identifiants invalides")

    return user


@app.get("/pmes", response_model=list[PmeRead])
def list_pmes(db: Session = Depends(get_db)) -> list[Pme]:
    return db.query(Pme).order_by(Pme.name.asc()).all()


@app.get("/users", response_model=list[UserRead])
def list_users(role: str | None = None, db: Session = Depends(get_db)) -> list[User]:
    query = db.query(User)

    if role is not None:
        query = query.filter(User.role == role)

    return query.order_by(User.full_name.asc()).all()


@app.get("/expense-categories", response_model=list[ExpenseCategoryRead])
def list_expense_categories(db: Session = Depends(get_db)) -> list[ExpenseCategoryRead]:
    category_rows = (
        db.query(Expense.category, func.count(Expense.id))
        .group_by(Expense.category)
        .order_by(Expense.category.asc())
        .all()
    )
    usage_by_category = {category: count for category, count in category_rows}
    category_names = sorted(set(DEFAULT_EXPENSE_CATEGORIES) | set(usage_by_category))

    return [
        ExpenseCategoryRead(name=category_name, usage_count=usage_by_category.get(category_name, 0))
        for category_name in category_names
    ]


@app.post("/invoices", response_model=InvoiceRead, status_code=status.HTTP_201_CREATED)
def create_invoice(
    invoice_data: InvoiceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(UserRole.comptable, UserRole.admin)),
) -> Invoice:
    invoice = Invoice(**invoice_data.model_dump())
    db.add(invoice)
    db.commit()
    db.refresh(invoice)
    return invoice


@app.get("/invoices", response_model=list[InvoiceRead])
def list_invoices(
    pme_id: int | None = None,
    status_filter: InvoiceStatus | None = None,
    db: Session = Depends(get_db),
) -> list[Invoice]:
    query = db.query(Invoice)

    if pme_id is not None:
        query = query.filter(Invoice.pme_id == pme_id)

    if status_filter is not None:
        query = query.filter(Invoice.status == status_filter)

    return query.order_by(Invoice.issue_date.desc(), Invoice.created_at.desc()).all()


@app.post("/expenses", response_model=ExpenseRead, status_code=status.HTTP_201_CREATED)
def create_expense(
    expense_data: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(UserRole.gerant_pme, UserRole.admin)),
) -> Expense:
    expense = Expense(
        **expense_data.model_dump(),
        created_by_role=current_user.role.value,
    )
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return expense


@app.get("/expenses", response_model=list[ExpenseRead])
def list_expenses(
    pme_id: int | None = None,
    status_filter: ExpenseStatus | None = None,
    db: Session = Depends(get_db),
) -> list[Expense]:
    query = db.query(Expense)

    if pme_id is not None:
        query = query.filter(Expense.pme_id == pme_id)

    if status_filter is not None:
        query = query.filter(Expense.status == status_filter)

    return query.order_by(Expense.created_at.desc()).all()


@app.get("/expenses/{expense_id}", response_model=ExpenseRead)
def get_expense(expense_id: int, db: Session = Depends(get_db)) -> Expense:
    expense = db.get(Expense, expense_id)

    if expense is None:
        raise HTTPException(status_code=404, detail="Depense introuvable")

    return expense


@app.patch("/expenses/{expense_id}/approve", response_model=ExpenseRead)
def approve_expense(
    expense_id: int,
    decision: ExpenseDecision,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(UserRole.comptable, UserRole.admin)),
) -> Expense:
    expense = db.get(Expense, expense_id)

    if expense is None:
        raise HTTPException(status_code=404, detail="Depense introuvable")

    if expense.status != ExpenseStatus.pending:
        raise HTTPException(status_code=400, detail="La depense a deja ete traitee")

    expense.status = ExpenseStatus.approved
    expense.decision_by_role = current_user.role.value
    expense.decision_by_name = decision.decision_by_name
    expense.decision_comment = decision.comment
    db.commit()
    db.refresh(expense)
    return expense


@app.patch("/expenses/{expense_id}/reject", response_model=ExpenseRead)
def reject_expense(
    expense_id: int,
    decision: ExpenseDecision,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(UserRole.comptable, UserRole.admin)),
) -> Expense:
    expense = db.get(Expense, expense_id)

    if expense is None:
        raise HTTPException(status_code=404, detail="Depense introuvable")

    if expense.status != ExpenseStatus.pending:
        raise HTTPException(status_code=400, detail="La depense a deja ete traitee")

    expense.status = ExpenseStatus.rejected
    expense.decision_by_role = current_user.role.value
    expense.decision_by_name = decision.decision_by_name
    expense.decision_comment = decision.comment
    db.commit()
    db.refresh(expense)
    return expense
