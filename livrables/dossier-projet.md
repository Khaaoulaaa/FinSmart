# Dossier projet - FinSmart Pro

## 1. Introduction

FinSmart Pro est un projet d'application SaaS destinee aux PME. La plateforme a pour objectif de centraliser plusieurs activites financieres dans un outil unique : gestion des depenses, comptabilite, facturation, tresorerie et reporting.

Le projet est realise dans un cadre scolaire et s'appuie sur une demarche progressive. Une premiere fonctionnalite a ete developpee pendant le Sprint 1 : la gestion des depenses.

## 2. Contexte entreprise

Le client fictif du projet est le cabinet **Expertise & Conseil**.

Ce cabinet accompagne des petites et moyennes entreprises dans leur gestion administrative, comptable et financiere. Ses clients doivent souvent utiliser plusieurs outils differents pour suivre leurs factures, leurs depenses, leur tresorerie et leurs bilans.

Cette dispersion des outils peut provoquer :

- une perte de temps ;
- des erreurs de saisie ;
- un manque de visibilite sur les depenses ;
- des difficultes a produire des rapports fiables ;
- une collaboration moins fluide entre les gerants et les comptables.

Le cabinet souhaite donc disposer d'une solution moderne pour simplifier le suivi financier de ses clients.

## 3. Contexte projet

FinSmart Pro repond a ce besoin en proposant une plateforme web centralisee.

La solution doit permettre a plusieurs profils d'utilisateurs de travailler sur les memes donnees financieres, avec des droits adaptes :

- **Admin** : gere les utilisateurs, les PME et la configuration ;
- **Gerant PME** : saisit les depenses et consulte ses donnees ;
- **Comptable** : controle, categorise, valide ou refuse les depenses.

Le projet commence par la gestion des depenses car cette fonctionnalite represente un flux simple et important :

1. le Gerant PME declare une depense ;
2. la depense est stockee en base ;
3. le Comptable controle la depense ;
4. le Comptable valide ou refuse la depense ;
5. l'historique reste consultable.

## 4. Problematique

Comment concevoir une application web permettant aux PME de centraliser et fiabiliser leur gestion financiere, tout en facilitant le travail de controle du cabinet comptable ?

## 5. Objectifs du projet

### Objectif principal

Simplifier la gestion financiere des PME clientes du cabinet Expertise & Conseil.

### Objectifs secondaires

- centraliser les depenses dans une base PostgreSQL ;
- proposer une API claire avec FastAPI ;
- fournir une interface React exploitable ;
- separer les roles utilisateurs ;
- automatiser les tests via une CI ;
- preparer un environnement de staging ;
- documenter la conception et le suivi du projet.

## 6. Perimetre fonctionnel

Le perimetre global du projet comprend :

- gestion des depenses ;
- comptabilite ;
- facturation ;
- tresorerie ;
- reporting ;
- gestion multi-utilisateurs ;
- roles et permissions.

Pour le Sprint 1, le perimetre traite est limite a la gestion des depenses.

## 7. Fonctionnalite realisee au Sprint 1

La fonctionnalite **Gestion des depenses** permet :

- de creer une depense ;
- de consulter la liste des depenses ;
- de filtrer les depenses ;
- de valider une depense ;
- de refuser une depense ;
- d'empecher une deuxieme decision sur une depense deja traitee.

Les statuts utilises sont :

- `pending` : depense en attente ;
- `approved` : depense validee ;
- `rejected` : depense refusee.

## 8. Architecture technique

| Couche | Technologie |
| --- | --- |
| Backend | Python FastAPI |
| Frontend | React avec Vite |
| Base de donnees | PostgreSQL |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| Tests | Pytest, Ruff, ESLint |
| CI/CD | GitHub Actions |
| Conteneurisation | Docker, Docker Compose |

## 9. Methodologie projet

Le projet est organise selon une methode agile de type Scrum simplifiee.

Le travail est decoupe en sprints. Chaque sprint permet de :

- definir des objectifs ;
- selectionner des taches depuis la backlog ;
- developper une partie fonctionnelle ;
- tester les elements produits ;
- faire un bilan ;
- ajuster la backlog pour la suite.

Cette methode permet de construire progressivement le projet et de prendre en compte les retours au fur et a mesure.

## 10. Organisation Sprint 1

### Objectif Sprint 1

Mettre en place la base technique du projet et developper la premiere fonctionnalite : la gestion des depenses.

### Elements realises

- depot GitHub initialise ;
- README professionnel ;
- cahier des charges ;
- backend FastAPI ;
- PostgreSQL via SQLAlchemy ;
- endpoints depenses ;
- tests unitaires ;
- pipeline CI ;
- Dockerfile ;
- configuration staging ;
- frontend React ;
- documentation de conception.

### Bilan Sprint 1

Le Sprint 1 est considere comme termine car la fonctionnalite principale est developpee, testee et documentee.

Certaines parties restent a poursuivre au Sprint 2 :

- authentification ;
- roles utilisateurs ;
- securisation des endpoints ;
- deploiement reel sur VPS ;
- finalisation des tests d'integration frontend/backend.

## 11. Organisation Sprint 2

Le Sprint 2 doit renforcer la fonctionnalite existante.

Les priorites sont :

- finaliser l'integration frontend/backend ;
- ajouter une authentification ;
- mettre en place les roles ;
- securiser les actions selon les profils ;
- tester le staging ;
- mettre a jour la documentation.

## 12. Conclusion provisoire

Le projet FinSmart Pro dispose maintenant d'une base technique solide et d'une premiere fonctionnalite concrete. La gestion des depenses constitue une premiere brique importante pour la future plateforme financiere.

La suite du projet devra principalement porter sur la securite, les roles et la mise en conditions de deploiement.

