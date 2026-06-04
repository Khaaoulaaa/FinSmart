from fastapi.testclient import TestClient

from database import Base, SessionLocal, engine
from main import app
from models import Pme, User, UserRole


client = TestClient(app)
GERANT_HEADERS = {"X-User-Email": "gerant@example.be"}
COMPTABLE_HEADERS = {"X-User-Email": "comptable@example.be"}


def setup_function() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        db.add(
            User(
                full_name="Gerant PME",
                email="gerant@example.be",
                password_hash="demo",
                role=UserRole.gerant_pme,
            )
        )
        db.add(
            User(
                full_name="Comptable",
                email="comptable@example.be",
                password_hash="demo",
                role=UserRole.comptable,
            )
        )
        db.commit()


def test_login_returns_user_role() -> None:
    response = client.post(
        "/auth/login",
        json={"email": "comptable@example.be", "password": "demo1234"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "comptable@example.be"
    assert data["role"] == "comptable"


def test_login_rejects_invalid_password() -> None:
    response = client.post(
        "/auth/login",
        json={"email": "comptable@example.be", "password": "wrong-password"},
    )

    assert response.status_code == 401


def test_list_pmes_returns_database_companies() -> None:
    with SessionLocal() as db:
        db.add(Pme(name="Alpha SARL", vat_number="BE0123456789", contact_email="contact@alpha.be"))
        db.add(Pme(name="Beta Consulting", vat_number="BE0987654321", contact_email="hello@beta.be"))
        db.commit()

    response = client.get("/pmes")

    assert response.status_code == 200
    data = response.json()
    assert [pme["name"] for pme in data] == ["Alpha SARL", "Beta Consulting"]


def test_list_users_can_filter_by_role() -> None:
    with SessionLocal() as db:
        db.add(
            User(
                full_name="Sarah Martin",
                email="sarah.martin@example.be",
                password_hash="demo",
                role=UserRole.comptable,
            )
        )
        db.add(
            User(
                full_name="Nadia Benali",
                email="nadia.benali@example.be",
                password_hash="demo",
                role=UserRole.gerant_pme,
            )
        )
        db.commit()

    response = client.get("/users", params={"role": "comptable"})

    assert response.status_code == 200
    data = response.json()
    assert all(user["role"] == "comptable" for user in data)
    assert "Sarah Martin" in {user["full_name"] for user in data}


def test_list_expense_categories_includes_defaults_and_usage_count() -> None:
    client.post(
        "/expenses",
        headers=GERANT_HEADERS,
        json={
            "pme_id": 1,
            "title": "Licence CRM",
            "category": "Logiciel",
            "amount": "49.99",
            "expense_date": "2026-05-15",
            "created_by_name": "Nadia Benali",
        },
    )
    client.post(
        "/expenses",
        headers=GERANT_HEADERS,
        json={
            "pme_id": 1,
            "title": "Train client",
            "category": "Transport",
            "amount": "35.50",
            "expense_date": "2026-05-16",
            "created_by_name": "Nadia Benali",
        },
    )

    response = client.get("/expense-categories")

    assert response.status_code == 200
    categories = {category["name"]: category["usage_count"] for category in response.json()}
    assert categories["Fournitures"] == 0
    assert categories["Logiciel"] == 1
    assert categories["Transport"] == 1


def test_create_invoice() -> None:
    response = client.post(
        "/invoices",
        headers=COMPTABLE_HEADERS,
        json={
            "pme_id": 1,
            "invoice_number": "FAC-2026-TEST",
            "client_name": "Client Horizon",
            "subject": "Accompagnement mensuel",
            "amount_ht": "1250.00",
            "vat_rate": "21.00",
            "issue_date": "2026-05-20",
            "due_date": "2026-06-20",
            "status": "sent",
            "notes": "Facture de test",
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["invoice_number"] == "FAC-2026-TEST"
    assert data["status"] == "sent"
    assert data["amount_ht"] == "1250.00"


def test_list_invoices_can_filter_by_status() -> None:
    invoices = [
        {
            "pme_id": 1,
            "invoice_number": "FAC-2026-PAID",
            "client_name": "Nova Services",
            "subject": "Audit financier",
            "amount_ht": "980.00",
            "issue_date": "2026-04-10",
            "due_date": "2026-05-10",
            "status": "paid",
        },
        {
            "pme_id": 1,
            "invoice_number": "FAC-2026-DRAFT",
            "client_name": "Atelier Nord",
            "subject": "Preparation comptable",
            "amount_ht": "2100.00",
            "issue_date": "2026-05-01",
            "due_date": "2026-06-01",
            "status": "draft",
        },
    ]

    for invoice in invoices:
        client.post("/invoices", headers=COMPTABLE_HEADERS, json=invoice)

    response = client.get("/invoices", params={"status_filter": "paid"})

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["invoice_number"] == "FAC-2026-PAID"


def test_create_invoice_rejects_negative_amount() -> None:
    response = client.post(
        "/invoices",
        headers=COMPTABLE_HEADERS,
        json={
            "pme_id": 1,
            "invoice_number": "FAC-2026-INVALID",
            "client_name": "Client Test",
            "subject": "Montant invalide",
            "amount_ht": "-50.00",
            "issue_date": "2026-05-20",
            "due_date": "2026-06-20",
            "status": "draft",
        },
    )

    assert response.status_code == 422


def test_invoice_creation_requires_comptable_or_admin_role() -> None:
    response = client.post(
        "/invoices",
        headers=GERANT_HEADERS,
        json={
            "pme_id": 1,
            "invoice_number": "FAC-2026-FORBIDDEN",
            "client_name": "Client Test",
            "subject": "Role interdit",
            "amount_ht": "50.00",
            "issue_date": "2026-05-20",
            "due_date": "2026-06-20",
            "status": "draft",
        },
    )

    assert response.status_code == 403
