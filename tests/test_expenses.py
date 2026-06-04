import os

os.environ["DATABASE_URL"] = "sqlite+pysqlite:///:memory:"
os.environ["ENVIRONMENT"] = "test"

from fastapi.testclient import TestClient  # noqa: E402

from database import Base, SessionLocal, engine  # noqa: E402
from main import app  # noqa: E402
from models import User, UserRole  # noqa: E402


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


def test_create_expense() -> None:
    response = client.post(
        "/expenses",
        headers=GERANT_HEADERS,
        json={
            "pme_id": 1,
            "title": "Achat fournitures",
            "description": "Papier et stylos",
            "category": "Fournitures",
            "amount": "125.50",
            "expense_date": "2026-04-30",
            "receipt_url": "https://example.com/recu.pdf",
            "created_by_name": "Gerant PME",
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Achat fournitures"
    assert data["status"] == "pending"
    assert data["created_by_role"] == "gerant_pme"


def test_approve_expense() -> None:
    created = client.post(
        "/expenses",
        headers=GERANT_HEADERS,
        json={
            "pme_id": 1,
            "title": "Abonnement logiciel",
            "category": "Logiciel",
            "amount": "49.99",
            "expense_date": "2026-04-30",
            "created_by_name": "Gerant PME",
        },
    ).json()

    response = client.patch(
        f"/expenses/{created['id']}/approve",
        headers=COMPTABLE_HEADERS,
        json={
            "decision_by_name": "Comptable",
            "comment": "Depense conforme",
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "approved"
    assert data["decision_by_role"] == "comptable"
    assert data["decision_by_name"] == "Comptable"


def test_reject_already_processed_expense() -> None:
    created = client.post(
        "/expenses",
        headers=GERANT_HEADERS,
        json={
            "pme_id": 1,
            "title": "Restaurant client",
            "category": "Reception",
            "amount": "89.00",
            "expense_date": "2026-04-30",
            "created_by_name": "Gerant PME",
        },
    ).json()

    client.patch(
        f"/expenses/{created['id']}/approve",
        headers=COMPTABLE_HEADERS,
        json={
            "decision_by_name": "Comptable",
            "comment": "OK",
        },
    )

    response = client.patch(
        f"/expenses/{created['id']}/reject",
        headers=COMPTABLE_HEADERS,
        json={
            "decision_by_name": "Comptable",
            "comment": "Refus impossible",
        },
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "La depense a deja ete traitee"
