# FinSmart Pro

FinSmart Pro est une solution SaaS destinee aux PME pour centraliser la gestion comptable, la facturation, la tresorerie et le reporting financier.

Le projet est realise pour le cabinet **Expertise & Conseil** afin de simplifier le suivi financier de ses entreprises clientes.

## Liens importants

| Element | Lien |
| --- | --- |
| Repository GitHub | [Khaaoulaaa/FinSmart](https://github.com/Khaaoulaaa/FinSmart) |
| Backlog et avancement | [Tickets GitHub FinSmart](https://github.com/Khaaoulaaa/FinSmart/issues) |
| Dossier projet / livrables | [Dossier `livrables/`](https://github.com/Khaaoulaaa/FinSmart/tree/main/livrables) |
| Dossier professionnel | [Livrables du dossier professionnel](https://github.com/Khaaoulaaa/FinSmart/tree/main/livrables) |
| Documentation de deploiement | [docs/deploiement-staging.md](https://github.com/Khaaoulaaa/FinSmart/blob/main/docs/deploiement-staging.md) |
| Application deployee | A ajouter des que l'URL de production est disponible - suivi dans [#9](https://github.com/Khaaoulaaa/FinSmart/issues/9) |

## Suivi de projet

La backlog est suivie avec les tickets GitHub du repository. Les tickets sont etiquetes avec `backlog` et `todo` pour montrer les elements restants et l'avancement du projet.

Pour les prochains developpements, les commits seront decoupes de maniere atomique : une fonctionnalite, une correction ou une mise a jour documentaire par commit.

## Fonctionnalite avancee : gestion des depenses

La fonctionnalite depenses couvre maintenant le backend et le frontend :

- le Gerant PME saisit une depense depuis l'interface React ;
- la depense est enregistree dans PostgreSQL via l'API FastAPI ;
- la depense est creee avec le statut `pending` ;
- le Comptable peut valider ou refuser une depense ;
- l'interface affiche les indicateurs, les filtres, la recherche et les actions.

## Elements demandes pour le rendu

| Demande | Realisation dans le projet |
| --- | --- |
| Developpement de la fonctionnalite | API FastAPI + interface React pour creer, consulter, valider et refuser une depense |
| Tests unitaires minimum | Tests backend disponibles dans `tests/test_expenses.py` |
| Deploiement staging | Configuration dans `docker-compose.staging.yml` et documentation dans `docs/deploiement-staging.md` |
| Conception de la fonctionnalite | Documentation dans `docs/fonctionnalite-depenses.md` |

## Stack technique

| Couche | Technologie |
| --- | --- |
| Backend | Python, FastAPI |
| Frontend | React, Vite, JavaScript |
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
+-- frontend/
|   +-- src/
|   |   +-- App.jsx
|   |   +-- main.jsx
|   |   +-- styles.css
|   +-- package.json
|   +-- package-lock.json
|   +-- vite.config.js
+-- tests/
|   +-- conftest.py
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
```

## Demarrage backend

Avec Docker Compose :

```bash
docker compose up --build
```

API :

```text
http://localhost:8000
```

Swagger :

```text
http://localhost:8000/docs
```

## Demarrage frontend

```bash
cd frontend
npm install
npm run dev
```

Interface React :

```text
http://localhost:5173
```

## Tests et CI

Backend :

```bash
pytest
ruff check .
```

Frontend :

```bash
cd frontend
npm run lint
npm run build
```

La CI GitHub Actions execute les checks backend et frontend avec `.github/workflows/ci.yml`.

## Livrables projet

Les livrables de suivi sont disponibles dans le dossier `livrables/` :

- backlog mise a jour ;
- bilan du Sprint 1 ;
- planning Sprint 2 ;
- debut du dossier projet ;
- debut du dossier professionnel bloc 1.

## Endpoints depenses

| Methode | Route | Description |
| --- | --- | --- |
| POST | `/expenses` | Creer une depense |
| GET | `/expenses` | Lister les depenses |
| GET | `/expenses/{expense_id}` | Consulter une depense |
| PATCH | `/expenses/{expense_id}/approve` | Valider une depense |
| PATCH | `/expenses/{expense_id}/reject` | Refuser une depense |

## Statuts disponibles

- `pending` : depense en attente de traitement ;
- `approved` : depense validee par le comptable ;
- `rejected` : depense refusee par le comptable.
