# Dossier professionnel - FinSmart Pro

## 1. Presentation du contexte professionnel

Le projet FinSmart Pro est une application web SaaS destinee aux PME. Il est realise pour le cabinet fictif **Expertise & Conseil**, qui souhaite aider ses clients a mieux suivre leurs depenses, leur tresorerie et leurs informations financieres.

Dans le cadre du dossier professionnel, ce projet permet de presenter des situations concretes de conception, de developpement frontend, de developpement backend, de gestion de base de donnees, de tests et de deploiement.

## 2. Role tenu dans le projet

Mon role consiste a participer a la conception et au developpement de l'application FinSmart Pro.

Les missions realisees ou demarrees sont :

- analyser le besoin fonctionnel ;
- rediger le contexte projet ;
- preparer les diagrammes de conception ;
- developper une interface web React ;
- developper une API FastAPI ;
- modeliser les donnees ;
- mettre en place des tests ;
- documenter le projet ;
- suivre les taches avec GitHub Issues.

## 3. Activite type 1 - Developper la partie frontend d'une application web

### 3.1 Objectif de l'activite

L'objectif de cette activite est de construire une interface utilisateur claire, responsive et exploitable. Dans FinSmart Pro, cette interface permet au gerant PME de declarer une depense et au comptable de consulter les depenses pour les valider ou les refuser.

### 3.2 Exemple 1 - Interface de gestion des depenses

#### Contexte

Le gerant PME doit pouvoir saisir rapidement une depense avec les informations principales : libelle, montant, date, categorie, commentaire et justificatif.

#### Travail realise

J'ai mis en place une interface React avec :

- un formulaire de creation de depense ;
- une liste des depenses ;
- des indicateurs de synthese ;
- un filtre par statut ;
- une recherche textuelle ;
- des boutons d'action pour valider ou refuser une depense.

#### Competences mobilisees

- creation de composants React ;
- gestion d'etat avec `useState` ;
- calcul de donnees avec `useMemo` ;
- appels API avec `fetch` ;
- gestion des erreurs ;
- organisation d'une interface responsive.

#### Resultat obtenu

L'utilisateur dispose d'une interface fonctionnelle pour suivre les depenses et interagir avec l'API backend.

### 3.3 Exemple 2 - Integration avec l'API backend

#### Contexte

L'interface frontend doit communiquer avec le backend pour charger les depenses, creer une nouvelle depense et envoyer une decision de validation ou de refus.

#### Travail realise

J'ai connecte le frontend aux endpoints suivants :

- `GET /expenses` pour charger les depenses ;
- `POST /expenses` pour creer une depense ;
- `PATCH /expenses/{id}/approve` pour valider une depense ;
- `PATCH /expenses/{id}/reject` pour refuser une depense.

L'URL de l'API est configurable avec la variable `VITE_API_URL`, ce qui permet d'adapter l'application entre l'environnement local et un futur environnement de deploiement.

#### Competences mobilisees

- consommation d'une API REST ;
- traitement des reponses JSON ;
- affichage conditionnel selon les erreurs ;
- mise a jour de l'interface apres une action utilisateur.

### 3.4 Fin de l'activite type 1

L'activite type 1 est couverte par la partie frontend de FinSmart Pro. L'application contient une interface exploitable, connectee a l'API, avec des formulaires, des listes, des filtres et des actions utilisateur.

Les ameliorations prevues sont :

- renforcer le responsive mobile ;
- ameliorer les messages d'erreur ;
- ajouter l'authentification cote interface ;
- gerer les roles dans l'affichage.

## 4. Activite type 2 - Developper la partie backend d'une application web

### 4.1 Objectif de l'activite

L'objectif de cette activite est de construire la partie serveur de l'application : API, regles metier, persistance des donnees, tests et securisation.

Dans FinSmart Pro, l'activite type 2 demarre avec la fonctionnalite de gestion des depenses.

### 4.2 Exemple 1 - Creation de l'API depenses

#### Contexte

Le backend doit permettre de creer, consulter, valider et refuser une depense.

#### Travail realise

J'ai developpe une API avec FastAPI. Les routes principales sont :

- `POST /expenses` ;
- `GET /expenses` ;
- `GET /expenses/{expense_id}` ;
- `PATCH /expenses/{expense_id}/approve` ;
- `PATCH /expenses/{expense_id}/reject`.

#### Competences mobilisees

- creation d'endpoints REST ;
- validation des donnees avec Pydantic ;
- separation entre schemas, modeles et logique applicative ;
- gestion des erreurs HTTP ;
- structuration d'une API documentee avec Swagger.

### 4.3 Exemple 2 - Modelisation et persistance des donnees

#### Contexte

Les depenses doivent etre stockees en base de donnees afin d'etre consultees et traitees par les utilisateurs.

#### Travail realise

J'ai demarre la modelisation des donnees avec les entites suivantes :

- `utilisateur` ;
- `pme` ;
- `depense` ;
- `categorie` ;
- `validation`.

Les diagrammes MCD, MLD et MPD permettent de justifier la structure de la base et les relations entre les tables.

#### Competences mobilisees

- conception d'une base relationnelle ;
- definition de cles primaires et etrangeres ;
- utilisation de SQLAlchemy ;
- preparation d'une base PostgreSQL ;
- respect des contraintes metier.

### 4.4 Exemple 3 - Regles metier de validation

#### Contexte

Une depense doit etre validee ou refusee par un comptable. Une fois traitee, elle ne doit plus pouvoir etre modifiee au niveau de sa decision.

#### Travail realise

J'ai mis en place les regles suivantes :

- une depense est creee avec un statut en attente ;
- une depense en attente peut etre validee ;
- une depense en attente peut etre refusee ;
- une depense deja validee ou refusee ne peut plus recevoir une seconde decision.

#### Competences mobilisees

- implementation de regles metier ;
- controle de l'etat d'un objet ;
- retour d'erreurs explicites ;
- verification avec tests unitaires.

### 4.5 Demarrage de l'activite type 2

L'activite type 2 est demarree mais doit encore etre completee avec les prochains developpements.

Les prochaines etapes sont :

- ajouter l'authentification ;
- securiser les routes selon les roles ;
- finaliser le modele utilisateur / PME / categorie / validation ;
- enrichir les tests backend ;
- connecter le backend a un environnement de production ;
- documenter les choix de securite et de deploiement.

## 5. Outils et environnement

| Besoin | Outil utilise |
| --- | --- |
| Gestion de code | Git, GitHub |
| Suivi des taches | GitHub Issues |
| Frontend | React, Vite |
| Backend | FastAPI |
| Base de donnees | PostgreSQL |
| Tests backend | Pytest |
| Qualite code | Ruff, ESLint |
| Conteneurisation | Docker, Docker Compose |
| CI | GitHub Actions |

## 6. Bilan provisoire

Le dossier professionnel contient maintenant la fin de l'activite type 1 et le demarrage des exemples pour l'activite type 2.

Le projet FinSmart Pro fournit des situations concretes pour expliquer le travail realise sur le frontend, le backend, la base de donnees, les tests et la documentation.
