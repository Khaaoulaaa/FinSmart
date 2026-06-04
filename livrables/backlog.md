# Backlog projet - FinSmart Pro

## Objectif du document

Ce document presente la backlog mise a jour au 04/06/2026. Il indique les fonctionnalites terminees, celles en cours, les tests associes et les prochains tickets a traiter.

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
| FS-14 | Configuration staging | Moyenne | En cours | Sprint 1 / Sprint 2 | Docker Compose staging et documentation prets, URL finale a ajouter |
| FS-15 | Frontend gestion des depenses | Haute | Termine | Sprint 1 / Sprint 2 | Interface React connectee a l'API avec creation, filtres et decisions |
| FS-16 | Authentification utilisateur | Haute | En cours avance | Sprint 2 | Endpoint `POST /auth/login` ajoute, version demo sans token a renforcer |
| FS-17 | Gestion des roles | Haute | En cours | Sprint 2 | Roles Admin, Gerant PME et Comptable presents dans les donnees de demo |
| FS-18 | Protection des routes API | Haute | En cours avance | Sprint 2 | Creation depense, validation/refus et facturation proteges par role via header demo |
| FS-19 | Gestion des categories de depenses | Moyenne | Termine | Sprint 2 | Categories principales exposees par l'API et utilisees dans le formulaire React |
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

## Suivi des tickets GitHub

| Ticket GitHub | Sujet | Statut actuel | Detail |
| --- | --- | --- | --- |
| [#1](https://github.com/Khaaoulaaa/FinSmart/issues/1) | Documentation et liens du projet | En cours avance | Liens dossiers et backlog ajoutes, URL finale de l'application encore a ajouter |
| [#2](https://github.com/Khaaoulaaa/FinSmart/issues/2) | Authentification utilisateur | En cours avance | Login backend demo et protections par role ajoutes, token a finaliser |
| [#4](https://github.com/Khaaoulaaa/FinSmart/issues/4) | Gestion des depenses | Termine | Ticket ferme, creation/liste/validation/refus et tests API faits |
| [#7](https://github.com/Khaaoulaaa/FinSmart/issues/7) | Categories de depenses | Termine | Ticket ferme, endpoint categories et select frontend faits |
| [#8](https://github.com/Khaaoulaaa/FinSmart/issues/8) | Tests et validation fonctionnelle | En cours avance | 12 tests backend passent, tests frontend a ajouter si possible |
| [#9](https://github.com/Khaaoulaaa/FinSmart/issues/9) | Deploiement de l'application | En cours | Workflow et documentation prets, URL publique a finaliser |
| [#10](https://github.com/Khaaoulaaa/FinSmart/issues/10) | Corrections UI et responsive | En cours | Connexion, depenses et facturation avancees cote interface |
| [#11](https://github.com/Khaaoulaaa/FinSmart/issues/11) | Module facturation clients | En cours avance | Modele, endpoints, interface, donnees demo et tests API ajoutes |

## Fonctionnalites ajoutees apres reflexion

Ces elements n'etaient pas forcement prevus au depart mais sont devenus necessaires :

- ajout d'une interface React pour rendre la fonctionnalite exploitable ;
- ajout de CORS dans FastAPI pour connecter frontend et backend ;
- ajout d'un fichier `docker-compose.staging.yml` pour preparer le staging ;
- ajout d'un document de conception dedie aux depenses ;
- ajout du controle CI frontend ;
- ajout d'une base de donnees de demonstration avec PME, utilisateurs, depenses et factures ;
- ajout d'un premier module de facturation ;
- ajout de tests backend sur les nouveaux endpoints ;
- ajout d'un endpoint pour les categories de depenses utilise par le frontend.

## Fonctionnalites reportees

Les fonctionnalites suivantes restent a finaliser pendant le Sprint 2 :

- authentification backend ;
- authentification avec token ou session ;
- hash et verification reelle des mots de passe ;
- securisation complete des endpoints ;
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
| Liste des categories de depenses | Test API Pytest | Termine | `tests/test_invoices_and_reference_data.py` |
| Connexion backend demo | Test API Pytest | Termine | `tests/test_invoices_and_reference_data.py` |
| Refus d'un mauvais mot de passe | Test API Pytest | Termine | `tests/test_invoices_and_reference_data.py` |
| Protection role facturation | Test API Pytest | Termine | `tests/test_invoices_and_reference_data.py` |

