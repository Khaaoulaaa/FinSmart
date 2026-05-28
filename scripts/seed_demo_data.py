from datetime import date
from decimal import Decimal
from pathlib import Path
import sys


sys.path.append(str(Path(__file__).resolve().parents[1]))

from database import SessionLocal, init_db
from models import Expense, ExpenseStatus, Invoice, InvoiceStatus, Pme, User, UserRole


DEMO_PASSWORD_HASH = "$2b$10$demo.hash.for.local.prototype"


def get_or_create_pme(db, name: str, vat_number: str, contact_email: str) -> Pme:
    pme = db.query(Pme).filter(Pme.name == name).one_or_none()

    if pme is not None:
        return pme

    pme = Pme(name=name, vat_number=vat_number, contact_email=contact_email)
    db.add(pme)
    db.flush()
    return pme


def get_or_create_user(db, full_name: str, email: str, role: UserRole, pme_id: int | None = None) -> User:
    user = db.query(User).filter(User.email == email).one_or_none()

    if user is not None:
        return user

    user = User(
        full_name=full_name,
        email=email,
        password_hash=DEMO_PASSWORD_HASH,
        role=role,
        pme_id=pme_id,
    )
    db.add(user)
    db.flush()
    return user


def expense_exists(db, title: str) -> bool:
    return db.query(Expense).filter(Expense.title == title).first() is not None


def invoice_exists(db, invoice_number: str) -> bool:
    return db.query(Invoice).filter(Invoice.invoice_number == invoice_number).first() is not None


def create_expense(
    db,
    *,
    pme_id: int,
    title: str,
    description: str,
    category: str,
    amount: str,
    expense_date: date,
    created_by_name: str,
    status: ExpenseStatus = ExpenseStatus.pending,
    decision_by_name: str | None = None,
    decision_comment: str | None = None,
) -> None:
    if expense_exists(db, title):
        return

    db.add(
        Expense(
            pme_id=pme_id,
            title=title,
            description=description,
            category=category,
            amount=Decimal(amount),
            expense_date=expense_date,
            created_by_name=created_by_name,
            status=status,
            decision_by_role="comptable" if decision_by_name else None,
            decision_by_name=decision_by_name,
            decision_comment=decision_comment,
        ),
    )


def create_invoice(
    db,
    *,
    pme_id: int,
    invoice_number: str,
    client_name: str,
    subject: str,
    amount_ht: str,
    vat_rate: str,
    issue_date: date,
    due_date: date,
    status: InvoiceStatus,
    notes: str | None = None,
) -> None:
    if invoice_exists(db, invoice_number):
        return

    db.add(
        Invoice(
            pme_id=pme_id,
            invoice_number=invoice_number,
            client_name=client_name,
            subject=subject,
            amount_ht=Decimal(amount_ht),
            vat_rate=Decimal(vat_rate),
            issue_date=issue_date,
            due_date=due_date,
            status=status,
            notes=notes,
        ),
    )


def main() -> None:
    init_db()

    with SessionLocal() as db:
        alpha = get_or_create_pme(db, "Alpha SARL", "BE0123456789", "contact@alphasarl.be")
        beta = get_or_create_pme(db, "Beta Consulting", "BE0987654321", "finance@betaconsulting.be")
        gamma = get_or_create_pme(db, "Gamma Retail", "BE0456123789", "admin@gammaretail.be")

        get_or_create_user(db, "Nadia Benali", "gerant@alphasarl.be", UserRole.gerant_pme, alpha.id)
        get_or_create_user(db, "Sarah Martin", "comptable@expertise.be", UserRole.comptable)
        get_or_create_user(db, "Amine Laurent", "amine.comptable@expertise.be", UserRole.comptable)
        get_or_create_user(db, "Elise Moreau", "elise.comptable@expertise.be", UserRole.comptable)
        get_or_create_user(db, "Khaoula Admin", "admin@finsmart.be", UserRole.admin)

        create_expense(
            db,
            pme_id=alpha.id,
            title="Achat fournitures bureau",
            description="Papier, stylos et classeurs pour le service administratif.",
            category="Fournitures",
            amount="184.50",
            expense_date=date(2026, 5, 6),
            created_by_name="Nadia Benali",
            status=ExpenseStatus.approved,
            decision_by_name="Sarah Martin",
            decision_comment="Facture conforme.",
        )
        create_expense(
            db,
            pme_id=alpha.id,
            title="Abonnement logiciel comptable",
            description="Renouvellement mensuel de l'outil de facturation.",
            category="Logiciel",
            amount="89.99",
            expense_date=date(2026, 5, 10),
            created_by_name="Nadia Benali",
        )
        create_expense(
            db,
            pme_id=beta.id,
            title="Deplacement client Bruxelles",
            description="Train et parking pour rendez-vous client.",
            category="Transport",
            amount="63.40",
            expense_date=date(2026, 5, 14),
            created_by_name="Karim Dufour",
            status=ExpenseStatus.rejected,
            decision_by_name="Amine Laurent",
            decision_comment="Justificatif incomplet.",
        )
        create_expense(
            db,
            pme_id=beta.id,
            title="Repas equipe projet",
            description="Dejeuner de coordination apres livraison sprint.",
            category="Reception",
            amount="126.80",
            expense_date=date(2026, 5, 17),
            created_by_name="Karim Dufour",
        )
        create_expense(
            db,
            pme_id=gamma.id,
            title="Achat terminal paiement",
            description="Terminal de paiement pour le point de vente.",
            category="Materiel",
            amount="249.00",
            expense_date=date(2026, 5, 20),
            created_by_name="Laura Petit",
        )

        create_invoice(
            db,
            pme_id=alpha.id,
            invoice_number="FAC-2026-001",
            client_name="Client Horizon",
            subject="Accompagnement comptable mensuel",
            amount_ht="1250.00",
            vat_rate="21.00",
            issue_date=date(2026, 5, 2),
            due_date=date(2026, 6, 1),
            status=InvoiceStatus.sent,
            notes="Facture envoyee au client.",
        )
        create_invoice(
            db,
            pme_id=alpha.id,
            invoice_number="FAC-2026-002",
            client_name="Atelier Nord",
            subject="Audit financier trimestriel",
            amount_ht="2100.00",
            vat_rate="21.00",
            issue_date=date(2026, 5, 8),
            due_date=date(2026, 6, 7),
            status=InvoiceStatus.draft,
        )
        create_invoice(
            db,
            pme_id=beta.id,
            invoice_number="FAC-2026-003",
            client_name="Nova Services",
            subject="Mission de conseil",
            amount_ht="980.00",
            vat_rate="21.00",
            issue_date=date(2026, 4, 18),
            due_date=date(2026, 5, 18),
            status=InvoiceStatus.paid,
            notes="Paiement recu.",
        )
        create_invoice(
            db,
            pme_id=gamma.id,
            invoice_number="FAC-2026-004",
            client_name="Retail Partner",
            subject="Installation caisse et reporting",
            amount_ht="1450.00",
            vat_rate="21.00",
            issue_date=date(2026, 4, 20),
            due_date=date(2026, 5, 20),
            status=InvoiceStatus.overdue,
            notes="Relance a prevoir.",
        )

        db.commit()

    print("Demo data inserted.")


if __name__ == "__main__":
    main()
