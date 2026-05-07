# Backlog projet - FinSmart Pro

## Objectif du document

Ce document presente la backlog mise a jour apres la fin du Sprint 1. Il indique les fonctionnalites terminees, celles reportees au Sprint 2, les nouvelles fonctionnalites identifiees et les elements qui ne seront pas traites dans l'immediat.

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
| FS-15 | Frontend gestion des depenses | Haute | En cours avance | Sprint 1 / Sprint 2 | Interface React ajoutee, a tester avec API + PostgreSQL |
| FS-16 | Authentification utilisateur | Haute | A faire | Sprint 2 | Necessaire pour securiser les roles |
| FS-17 | Gestion des roles | Haute | A faire | Sprint 2 | Admin, Gerant PME, Comptable |
| FS-18 | Protection des routes API | Haute | A faire | Sprint 2 | Restreindre validation/refus au Comptable |
| FS-19 | Gestion des categories de depenses | Moyenne | A faire | Sprint 2 | Categories configurables par Admin |
| FS-20 | Upload ou stockage des justificatifs | Moyenne | A faire | Sprint 2 | Actuellement lien `receipt_url` uniquement |
| FS-21 | Facturation | Moyenne | A faire | Sprint 3 | Devis, factures, relances |
| FS-22 | Reporting | Moyenne | A faire | Sprint 3 | Indicateurs financiers et export |
| FS-23 | Tresorerie | Basse | A faire | Sprint 4 | Previsionnel et rapprochement bancaire |
| FS-24 | Export Excel | Basse | A faire | Sprint 4 | Export des donnees financieres |

## Fonctionnalites ajoutees apres reflexion

Ces elements n'etaient pas forcement prevus au depart mais sont devenus necessaires :

- ajout d'une interface React pour rendre la fonctionnalite exploitable ;
- ajout de CORS dans FastAPI pour connecter frontend et backend ;
- ajout d'un fichier `docker-compose.staging.yml` pour preparer le staging ;
- ajout d'un document de conception dedie aux depenses ;
- ajout du controle CI frontend.

## Fonctionnalites reportees

Les fonctionnalites suivantes sont reportees au Sprint 2 :

- authentification ;
- gestion des roles ;
- securisation des endpoints ;
- finalisation du test complet frontend + backend + PostgreSQL ;
- deploiement reel sur VPS.

## Fonctionnalites non retenues pour le moment

Les fonctionnalites suivantes ne sont pas supprimees definitivement, mais ne seront pas presentes dans la prochaine livraison :

- rapprochement bancaire complet ;
- generation comptable avancee ;
- export Excel complet ;
- module facturation complet ;
- tableau de bord financier avance.

