# Bilan Sprint 1 - FinSmart Pro

## Periode

Sprint 1 : initialisation du projet et developpement de la premiere fonctionnalite.

## Objectif du Sprint 1

L'objectif principal du Sprint 1 etait de mettre en place les bases techniques du projet FinSmart Pro et de developper une premiere fonctionnalite utilisable : la gestion des depenses.

## Fonctionnalite choisie

La fonctionnalite choisie est la **gestion des depenses**.

Elle repond au besoin suivant :

- le Gerant PME doit pouvoir declarer une depense ;
- le Comptable doit pouvoir valider ou refuser cette depense ;
- la depense doit etre stockee dans une base de donnees PostgreSQL ;
- les traitements doivent etre documentes et testes.

## Travail realise

| Element | Etat | Detail |
| --- | --- | --- |
| Depot GitHub | Termine | Projet versionne sur GitHub |
| README | Termine | README mis a jour avec les informations techniques |
| Backend FastAPI | Termine | API creee avec endpoints depenses |
| PostgreSQL | Termine | Connexion via SQLAlchemy |
| Modele Depense | Termine | Table `expenses` definie dans `models.py` |
| Tests unitaires | Termine | Tests dans `tests/test_expenses.py` |
| CI backend | Termine | Ruff + Pytest dans GitHub Actions |
| Frontend React | En cours avance | Interface React creee pour les depenses |
| CI frontend | Termine | Lint + build React dans GitHub Actions |
| Staging | Prepare | Docker Compose staging et documentation |
| Conception | Termine | Document de conception depenses |

## Endpoints developpes

| Methode | Route | Role fonctionnel |
| --- | --- | --- |
| POST | `/expenses` | Creer une depense |
| GET | `/expenses` | Lister les depenses |
| GET | `/expenses/{expense_id}` | Consulter une depense |
| PATCH | `/expenses/{expense_id}/approve` | Valider une depense |
| PATCH | `/expenses/{expense_id}/reject` | Refuser une depense |

## Tests realises

Les tests unitaires couvrent :

- la creation d'une depense ;
- la validation d'une depense ;
- l'impossibilite de refuser une depense deja traitee.

Commande utilisee :

```bash
pytest
```

Resultat obtenu :

```text
3 passed
```

## Retours pris en compte

Plusieurs retours ou ajustements ont ete pris en compte pendant le Sprint 1 :

- remplacer le stockage temporaire par PostgreSQL ;
- ajouter SQLAlchemy pour structurer les acces base de donnees ;
- ajouter des tests unitaires minimum ;
- preparer un deploiement staging ;
- ajouter une vraie interface frontend React ;
- mettre a jour la CI pour verifier backend et frontend ;
- documenter la conception de la fonctionnalite.

## Points non termines

Certains elements n'ont pas ete finalises pendant le Sprint 1 :

- deploiement reel sur VPS ;
- authentification ;
- gestion fine des roles ;
- securisation des endpoints selon le role utilisateur ;
- upload reel des justificatifs.

Ces points sont reportes dans le Sprint 2.

## Conclusion du Sprint 1

Le Sprint 1 est valide car la fonctionnalite principale de gestion des depenses existe, elle est connectee a PostgreSQL, testee, documentee et accompagnee d'une premiere interface React.

La suite du projet doit maintenant renforcer la securite, les roles utilisateurs, le staging reel et la finalisation de l'experience frontend.

