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


## Statuts disponibles

- `pending` : depense en attente de traitement ;
- `approved` : depense validee par le comptable ;
- `rejected` : depense refusee par le comptable.
