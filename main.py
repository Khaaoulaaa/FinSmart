from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import get_db, init_db
from models import Expense, ExpenseStatus
from schemas import ExpenseCreate, ExpenseDecision, ExpenseRead


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


@app.post("/expenses", response_model=ExpenseRead, status_code=status.HTTP_201_CREATED)
def create_expense(expense_data: ExpenseCreate, db: Session = Depends(get_db)) -> Expense:
    expense = Expense(
        **expense_data.model_dump(),
        created_by_role="gerant_pme",
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
) -> Expense:
    expense = db.get(Expense, expense_id)

    if expense is None:
        raise HTTPException(status_code=404, detail="Depense introuvable")

    if expense.status != ExpenseStatus.pending:
        raise HTTPException(status_code=400, detail="La depense a deja ete traitee")

    expense.status = ExpenseStatus.approved
    expense.decision_by_role = "comptable"
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
) -> Expense:
    expense = db.get(Expense, expense_id)

    if expense is None:
        raise HTTPException(status_code=404, detail="Depense introuvable")

    if expense.status != ExpenseStatus.pending:
        raise HTTPException(status_code=400, detail="La depense a deja ete traitee")

    expense.status = ExpenseStatus.rejected
    expense.decision_by_role = "comptable"
    expense.decision_by_name = decision.decision_by_name
    expense.decision_comment = decision.comment
    db.commit()
    db.refresh(expense)
    return expense
