# Dossier professionnel - FinSmart Pro

## Informations personnelles

| Element | Information |
| --- | --- |
| Nom | Khaoula Adodi |
| Organisme de formation | Ecole IT |
| Titre prepare | Concepteur developpeur d'applications - niveau 6 |
| Reference | RNCP37873 |

## Parcours professionnel

Depuis janvier 2026, je travaille en freelance comme **Data Steward / Data Analyst chez Veeva**. Cette experience me permet de developper des competences dans la gestion, le controle et l'analyse de donnees.

En parallele, j'ai participe a plusieurs projets realises dans le cadre de ma formation a Ecole IT. Le projet FinSmart Pro constitue le principal support utilise dans ce dossier pour presenter mes competences en conception et developpement d'applications.

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

## 3. Bloc 1 - Developper une application securisee

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

### 3.4 Exemple 3 - Interface de connexion et adaptation aux roles

#### Contexte

Les utilisateurs de FinSmart n'ont pas tous les memes responsabilites. Le gerant PME, le comptable et l'administrateur doivent disposer d'une interface adaptee a leur role.

#### Travail realise

J'ai ajoute :

- une page de connexion ;
- trois profils de demonstration ;
- un affichage adapte au role connecte ;
- une deconnexion ;
- l'envoi de l'identite utilisateur au backend pour controler les actions autorisees.

#### Competences mobilisees

- gestion d'un formulaire de connexion ;
- gestion de l'etat utilisateur ;
- affichage conditionnel ;
- integration avec une API ;
- prise en compte des autorisations.

### 3.5 Bilan du bloc 1

Le bloc 1 est couvert pour le niveau prototype par la partie frontend de FinSmart Pro et par les composants metier exposes par l'API. L'application contient une interface exploitable, connectee au backend, avec des formulaires, des listes, des filtres et des actions controlees selon le role.

Les ameliorations prevues sont :

- renforcer le responsive mobile ;
- ameliorer les messages d'erreur ;
- ajouter des tests frontend automatises ;
- renforcer l'accessibilite de l'interface.

## 4. Bloc 2 - Concevoir et developper une application securisee organisee en couches

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

### 4.5 Exemple 4 - Authentification et protection des roles

#### Contexte

Certaines actions doivent etre reservees a un profil precis. Par exemple, un gerant PME peut creer une depense, tandis qu'un comptable peut la valider ou la refuser.

#### Travail realise

J'ai ajoute :

- l'endpoint `POST /auth/login` ;
- la verification des comptes de demonstration ;
- les roles `admin`, `gerant_pme` et `comptable` ;
- une protection minimale des routes sensibles ;
- des erreurs HTTP `401` et `403` ;
- des tests sur la connexion et les autorisations.

Cette authentification reste une version de demonstration. Une version de production devra utiliser des mots de passe haches et un token ou une session securisee.

#### Competences mobilisees

- conception d'une authentification ;
- controle des autorisations ;
- securisation progressive d'une API ;
- gestion des erreurs HTTP ;
- ecriture de tests associes.

### 4.6 Exemple 5 - Facturation de base

#### Contexte

Les PME doivent pouvoir enregistrer et suivre leurs factures clients.

#### Travail realise

J'ai developpe :

- le modele de donnees `Invoice` ;
- la creation et la consultation des factures ;
- le filtrage par statut ;
- les statuts brouillon, envoyee, payee et en retard ;
- une interface React de saisie et de consultation ;
- des tests API sur la facturation.

#### Competences mobilisees

- evolution d'un modele relationnel ;
- creation d'endpoints REST ;
- validation des montants ;
- connexion entre frontend, API et base de donnees ;
- tests fonctionnels backend.

### 4.7 Bilan du bloc 2

Le bloc 2 est couvert par l'analyse du besoin, l'architecture en couches, la conception de la base relationnelle, le developpement de l'API et l'implementation des regles metier.

Les prochaines etapes sont :

- renforcer l'authentification avec un token ou une session ;
- finaliser le modele avec les futures fonctionnalites de reporting ;
- enrichir les tests backend ;
- documenter davantage les choix de securite.

## 5. Bloc 3 - Preparer le deploiement d'une application securisee

### 5.1 Exemple 1 - Tests et controle qualite

#### Travail realise

J'ai ajoute des tests Pytest pour verifier les depenses, les utilisateurs, les categories, l'authentification, les roles et les factures.

Les controles utilises sont :

```powershell
pytest
ruff check .
cd frontend
npm run lint
npm run build
```

Au terme du Sprint 2, 12 tests backend passent.

### 5.2 Exemple 2 - Conteneurisation

J'ai utilise Docker et Docker Compose pour executer :

- l'API FastAPI ;
- la base PostgreSQL ;
- la configuration locale et la preparation du staging.

Cette configuration facilite l'installation du projet sur un autre poste et limite les differences entre les environnements.

### 5.3 Exemple 3 - Integration continue

Une integration continue GitHub Actions controle automatiquement :

- le lint backend ;
- les tests backend ;
- le lint frontend ;
- le build React.

### 5.4 Bilan du bloc 3

Le deploiement est prepare avec Docker, Docker Compose, GitHub Actions et une documentation de staging. Le deploiement public final et la gestion complete des secrets restent a finaliser.

## 6. Outils et environnement

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

## 7. Difficultes rencontrees

Les principales difficultes rencontrees pendant le projet sont :

- connexion entre React et FastAPI ;
- configuration de PostgreSQL avec Docker ;
- conflit de port Docker avec une autre application ;
- mise en place des roles et des autorisations ;
- synchronisation du repository GitHub ;
- ajout progressif des tests associes.

Ces difficultes ont ete traitees par la consultation des logs, les tests locaux, la documentation technique et le decoupage des corrections en commits.

## 8. Tableau de correspondance RNCP

| Bloc | Realisations presentees | Niveau actuel |
| --- | --- | --- |
| BC01 - Developper une application securisee | Interfaces React, composants metier, connexion API, gestion de projet GitHub | Couvert pour le prototype |
| BC02 - Concevoir une application en couches | Analyse, UML, FastAPI, SQLAlchemy, PostgreSQL, roles et facturation | Couvert |
| BC03 - Preparer le deploiement | Pytest, Ruff, ESLint, build Vite, Docker et GitHub Actions | Couvert, deploiement public a finaliser |

## 9. Pieces justificatives a ajouter

Les preuves suivantes pourront etre inserees progressivement dans le dossier final :

- capture de la page de connexion ;
- capture de la gestion des depenses ;
- capture de la facturation ;
- capture de Swagger ;
- resultat des 12 tests Pytest ;
- pipeline GitHub Actions ;
- backlog GitHub ;
- diagrammes UML et base de donnees.

## 10. Bilan provisoire

Le dossier professionnel est maintenant organise selon les trois blocs du titre RNCP37873.

Le projet FinSmart Pro fournit des situations concretes pour expliquer le travail realise sur le frontend, le backend, la base de donnees, la securite, les tests et le deploiement. Mon experience de Data Steward / Data Analyst chez Veeva sera detaillee ulterieurement afin d'ajouter d'autres exemples professionnels lies aux donnees.
