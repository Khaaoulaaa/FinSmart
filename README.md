# FinSmart Pro

FinSmart Pro est une solution SaaS destinee aux PME pour centraliser la gestion comptable, la facturation, la tresorerie et le reporting financier.

Le projet est realise pour le cabinet **Expertise & Conseil** afin de simplifier le suivi financier de ses entreprises clientes.

## Fonctionnalite ajoutee : gestion des depenses

Cette premiere fonctionnalite suit le PDF fourni :

- le Gerant PME saisit une depense ;
- la depense est en statut `pending` au depart ;
- le Comptable peut valider la depense ;
- le Comptable peut refuser la depense ;
- les depenses sont stockees dans PostgreSQL.

## Elements demandes pour le rendu

| Demande | Realisation dans le projet |
| --- | --- |
| Developpement de la fonctionnalite | API FastAPI complete pour creer, consulter, valider et refuser une depense |
| Tests unitaires minimum | Tests disponibles dans `tests/test_expenses.py` |
| Deploiement staging | Configuration dans `docker-compose.staging.yml` et documentation dans `docs/deploiement-staging.md` |
| Conception de la fonctionnalite | Documentation dans `docs/fonctionnalite-depenses.md` |

## Stack technique

| Couche | Technologie |
| --- | --- |
| Backend | Python, FastAPI |
| Base de donnees | PostgreSQL |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| Conteneurisation | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| OS cible | Linux |

## Structure actuelle

```text
FinSmart/
+-- .github/workflows/ci.yml
+-- docs/
|   +-- fonctionnalite-depenses.md
|   +-- deploiement-staging.md
+-- tests/
|   +-- test_expenses.py
+-- main.py
+-- config.py
+-- database.py
+-- models.py
+-- schemas.py
+-- requirements.txt
+-- Dockerfile
+-- docker-compose.yml
+-- docker-compose.staging.yml
+-- .env.example
+-- .env.staging.example
+-- cahier-des-charges.md
+-- ci.yml
```

## Demarrage avec Docker Compose

```bash
docker compose up --build
```

L'API est disponible sur :

```text
http://localhost:8000
```

La documentation Swagger est disponible sur :

```text
http://localhost:8000/docs
```

## Demarrage local sans Docker pour l'API

Il faut d'abord lancer PostgreSQL avec les informations suivantes :

```text
database: finsmart
user: finsmart
password: finsmart
host: localhost
port: 5432
```

Puis installer et lancer l'API :

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Tests

```bash
pytest
```

La CI GitHub Actions execute aussi les tests avec le fichier `.github/workflows/ci.yml`.

Les tests couvrent actuellement :

- la creation d'une depense ;
- la validation d'une depense par le comptable ;
- le blocage d'une depense deja traitee.

## Deploiement staging

Une configuration de staging est fournie pour un VPS Ubuntu avec Docker Compose.

Documentation detaillee :

```text
docs/deploiement-staging.md
```

Commandes principales sur le serveur :

```bash
cp .env.staging.example .env
docker compose -f docker-compose.staging.yml up --build -d
```

Verification :

```bash
curl http://localhost:8000/health
```

La documentation Swagger du staging sera disponible sur :

```text
http://IP_DU_VPS:8000/docs
```

## Conception de la fonctionnalite

La conception detaillee de la gestion des depenses est disponible dans :

```text
docs/fonctionnalite-depenses.md
```

Ce document contient :

- les acteurs ;
- les regles metier ;
- le modele logique de donnees ;
- les diagrammes de sequence ;
- la liste des endpoints ;
- les tests prevus.

## Endpoints depenses

### Creer une depense

```http
POST /expenses
```

Exemple JSON :

```json
{
  "pme_id": 1,
  "title": "Achat fournitures",
  "description": "Papier et stylos pour le bureau",
  "category": "Fournitures",
  "amount": "125.50",
  "expense_date": "2026-04-30",
  "receipt_url": "https://example.com/recu.pdf",
  "created_by_name": "Gerant PME"
}
```

### Lister les depenses

```http
GET /expenses
```

Filtres possibles :

```http
GET /expenses?pme_id=1
GET /expenses?status_filter=pending
```

### Consulter une depense

```http
GET /expenses/1
```

### Valider une depense

```http
PATCH /expenses/1/approve
```

```json
{
  "decision_by_name": "Comptable",
  "comment": "Depense conforme"
}
```

### Refuser une depense

```http
PATCH /expenses/1/reject
```

```json
{
  "decision_by_name": "Comptable",
  "comment": "Justificatif manquant"
}
```

## Statuts disponibles

- `pending` : depense en attente de traitement ;
- `approved` : depense validee par le comptable ;
- `rejected` : depense refusee par le comptable.
