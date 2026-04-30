# FinSmart Pro

FinSmart Pro est une solution SaaS destinée aux PME pour centraliser la gestion comptable, la facturation, la trésorerie et le reporting financier.

Le projet est réalisé pour le cabinet **Expertise & Conseil** afin de simplifier le suivi financier de ses entreprises clientes.

## Objectifs

- Centraliser les données financières des PME dans une seule plateforme.
- Automatiser une partie de la comptabilité et du reporting.
- Faciliter la création de devis, factures et relances.
- Améliorer la visibilité sur la trésorerie.
- Permettre une gestion multi-utilisateurs avec rôles et permissions.

## Fonctionnalités prévues

- Comptabilité : saisie des écritures, génération automatique du bilan.
- Facturation : devis, factures, suivi des paiements et relances.
- Trésorerie : prévisionnel, rapprochement bancaire.
- Reporting : tableaux de bord, indicateurs financiers, export Excel.
- Gestion multi-utilisateurs : administrateur, comptable, client, lecteur.

## Stack technique

| Couche | Technologie |
| --- | --- |
| Backend | Python, FastAPI |
| Base de données | PostgreSQL |
| Frontend | JavaScript, React |
| Conteneurisation | Docker |
| CI/CD | GitHub Actions |
| OS cible | Linux |

## Structure du projet

```text
finsmart-pro/
├── .github/workflows/ci.yml
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py
│   └── requirements.txt
├── docs/
│   └── cahier-des-charges.md
├── Dockerfile
├── .gitignore
└── README.md
```

## Démarrage local

### Prérequis

- Python 3.11+
- Docker
- Git

### Installation backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

L'API est disponible sur :

```text
http://localhost:8000
```

La documentation Swagger est disponible sur :

```text
http://localhost:8000/docs
```

## Démarrage avec Docker

```bash
docker build -t finsmart-pro .
docker run -p 8000:8000 finsmart-pro
```

## Pipeline CI

Un premier workflow GitHub Actions est disponible dans `.github/workflows/ci.yml`.

Il vérifie automatiquement :

- l'installation des dépendances Python ;
- le linting avec Ruff ;
- l'exécution des tests avec Pytest.

## Statut du projet

Projet scolaire en phase d'initialisation.

