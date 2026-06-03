# Backlog projet - FinSmart Pro

## Objectif du document

Ce document presente la backlog mise a jour au 03/06/2026. Il indique les fonctionnalites terminees, celles en cours, les tests associes et les prochains tickets a traiter.

## Backlog mise a jour

| ID | Fonctionnalite | Priorite | Statut | Sprint cible | Commentaire |
| --- | --- | --- | --- | --- | --- |
| FS-01 | Initialisation du depot GitHub | Haute | Termine | Sprint 1 | Depot cree, structure initiale ajoutee |
| FS-02 | README professionnel | Haute | Termine | Sprint 1 | README mis a jour avec backend, frontend, tests et CI |
| FS-03 | Cahier des charges initial | Haute | Termine | Sprint 1 | Cahier des charges disponible a la racine |
| FS-04 | Pipeline CI backend | Haute | Termine | Sprint 1 | Ruff et Pytest configures |
| FS-05 | Pipeline CI frontend | Moyenne | Termine | Sprint 1 | Lint et build React ajoutes a GitHub Actions |
| FS-06 | Dockerfile API | Haute | Termine | Sprint 1 | Dockerfile disponible pour FastAPI |
| FS-07 | Connexion PostgreSQL | Haute | Termine | Sprint 1 | SQLAlchemy + PostgreSQL configures |
| FS-08 | Creation d'une depense | Haute | Termine | Sprint 1 | Endpoint `POST /expenses` |
| FS-09 | Liste des depenses | Haute | Termine | Sprint 1 | Endpoint `GET /expenses` avec filtres |
| FS-10 | Validation d'une depense | Haute | Termine | Sprint 1 | Endpoint `PATCH /expenses/{id}/approve` |
| FS-11 | Refus d'une depense | Haute | Termine | Sprint 1 | Endpoint `PATCH /expenses/{id}/reject` |
| FS-12 | Tests unitaires depenses | Haute | Termine | Sprint 1 | Tests de creation, validation et blocage |
| FS-13 | Conception de la fonctionnalite depenses | Haute | Termine | Sprint 1 | Document dans `docs/fonctionnalite-depenses.md` |
| FS-14 | Configuration staging | Moyenne | Prepare | Sprint 1 / Sprint 2 | Docker Compose staging pret, VPS a configurer |
| FS-15 | Frontend gestion des depenses | Haute | Termine | Sprint 1 / Sprint 2 | Interface React connectee a l'API avec creation, filtres et decisions |
| FS-16 | Authentification utilisateur | Haute | En cours | Sprint 2 | Connexion demo cote frontend, securisation backend a finaliser |
| FS-17 | Gestion des roles | Haute | En cours | Sprint 2 | Roles Admin, Gerant PME et Comptable presents dans les donnees de demo |
| FS-18 | Protection des routes API | Haute | A faire | Sprint 2 | Restreindre validation/refus au Comptable |
| FS-19 | Gestion des categories de depenses | Moyenne | A faire | Sprint 2 | Categories configurables par Admin |
| FS-20 | Upload ou stockage des justificatifs | Moyenne | A faire | Sprint 2 | Actuellement lien `receipt_url` uniquement |
| FS-21 | Facturation | Moyenne | En cours avance | Sprint 2 / Sprint 3 | Modele facture, endpoints API, interface React et donnees demo ajoutes |
| FS-22 | Reporting | Moyenne | A faire | Sprint 3 | Indicateurs financiers et export |
| FS-23 | Tresorerie | Basse | A faire | Sprint 4 | Previsionnel et rapprochement bancaire |
| FS-24 | Export Excel | Basse | A faire | Sprint 4 | Export des donnees financieres |
| FS-25 | Donnees de demonstration PostgreSQL | Haute | Termine | Sprint 2 | Script de seed avec PME, comptables, gerants, depenses et factures |
| FS-26 | Endpoints PME et utilisateurs | Moyenne | Termine | Sprint 2 | `GET /pmes` et `GET /users` avec filtre par role |
| FS-27 | Tests API facturation et referentiels | Haute | Termine | Sprint 2 | Tests Pytest sur factures, PME et utilisateurs |
| FS-28 | Mise a jour dossier projet | Haute | En cours | Sprint 2 | Conception BDD/UML a aligner avec les modules facturation et utilisateurs |
| FS-29 | Mise a jour dossier professionnel | Haute | En cours | Sprint 2 | Activite type 1 a finaliser, exemples activite type 2 a developper |

## Fonctionnalites ajoutees apres reflexion

Ces elements n'etaient pas forcement prevus au depart mais sont devenus necessaires :

- ajout d'une interface React pour rendre la fonctionnalite exploitable ;
- ajout de CORS dans FastAPI pour connecter frontend et backend ;
- ajout d'un fichier `docker-compose.staging.yml` pour preparer le staging ;
- ajout d'un document de conception dedie aux depenses ;
- ajout du controle CI frontend ;
- ajout d'une base de donnees de demonstration avec PME, utilisateurs, depenses et factures ;
- ajout d'un premier module de facturation ;
- ajout de tests backend sur les nouveaux endpoints.

## Fonctionnalites reportees

Les fonctionnalites suivantes restent a finaliser pendant le Sprint 2 :

- authentification backend ;
- protection reelle des routes selon le role ;
- securisation des endpoints ;
- finalisation du test complet frontend + backend + PostgreSQL ;
- mise a jour continue des dossiers projet et professionnel.

## Fonctionnalites non retenues pour le moment

Les fonctionnalites suivantes ne sont pas supprimees definitivement, mais ne seront pas presentes dans la prochaine livraison :

- rapprochement bancaire complet ;
- generation comptable avancee ;
- export Excel complet ;
- module facturation complet avec devis, relances et generation PDF ;
- tableau de bord financier avance.

## Suivi des tests associes

| Zone testee | Type de test | Statut | Fichier |
| --- | --- | --- | --- |
| Creation d'une depense | Test API Pytest | Termine | `tests/test_expenses.py` |
| Validation d'une depense | Test API Pytest | Termine | `tests/test_expenses.py` |
| Blocage d'une depense deja traitee | Test API Pytest | Termine | `tests/test_expenses.py` |
| Liste des PME | Test API Pytest | Termine | `tests/test_invoices_and_reference_data.py` |
| Filtre des utilisateurs par role | Test API Pytest | Termine | `tests/test_invoices_and_reference_data.py` |
| Creation d'une facture | Test API Pytest | Termine | `tests/test_invoices_and_reference_data.py` |
| Filtre des factures par statut | Test API Pytest | Termine | `tests/test_invoices_and_reference_data.py` |
| Validation des montants de facture | Test API Pytest | Termine | `tests/test_invoices_and_reference_data.py` |

