# Dossier professionnel - Bloc 1

## 1. Presentation du contexte

Dans le cadre de mon projet scolaire, j'ai travaille sur la conception et le developpement d'une application SaaS nommee **FinSmart Pro**.

Cette application est destinee aux PME clientes du cabinet fictif **Expertise & Conseil**. Son objectif est de centraliser la gestion financiere des entreprises : depenses, comptabilite, facturation, tresorerie et reporting.

Pour demarrer le projet, j'ai developpe une premiere fonctionnalite : la gestion des depenses.

## 2. Analyse du besoin

Le besoin principal est de permettre aux PME de mieux suivre leurs depenses et de faciliter le controle par un comptable.

Les utilisateurs identifies sont :

- **Admin** : il gere les utilisateurs, les PME et les parametres ;
- **Gerant PME** : il saisit les depenses de son entreprise ;
- **Comptable** : il controle les depenses et les valide ou les refuse.

Le flux attendu est le suivant :

1. le Gerant PME saisit une depense ;
2. la depense est stockee avec le statut `pending` ;
3. le Comptable analyse la depense ;
4. le Comptable valide ou refuse la depense ;
5. la decision est conservee dans l'application.

## 3. Objectifs professionnels du bloc

Ce travail permet de demontrer plusieurs competences professionnelles :

- analyser un besoin client ;
- concevoir une fonctionnalite applicative ;
- creer une API backend ;
- connecter une base de donnees ;
- mettre en place une interface utilisateur ;
- ecrire des tests unitaires ;
- utiliser Git et GitHub ;
- configurer une integration continue ;
- documenter le projet ;
- preparer un deploiement staging.

## 4. Environnement technique

| Element | Choix realise |
| --- | --- |
| Langage backend | Python |
| Framework backend | FastAPI |
| Base de donnees | PostgreSQL |
| ORM | SQLAlchemy |
| Validation de donnees | Pydantic |
| Frontend | React avec Vite |
| Tests backend | Pytest |
| Lint backend | Ruff |
| Lint frontend | ESLint |
| CI | GitHub Actions |
| Conteneurisation | Docker, Docker Compose |

## 5. Travail realise

### 5.1 Initialisation du projet

J'ai commence par structurer le depot GitHub du projet.

Les premiers fichiers ajoutes sont :

- un README professionnel ;
- un cahier des charges ;
- un Dockerfile ;
- une configuration CI ;
- une base d'API FastAPI.

Cette structure permet de rendre le projet lisible et exploitable par une autre personne.

### 5.2 Developpement de la fonctionnalite depenses

J'ai ensuite developpe la fonctionnalite de gestion des depenses.

Les principales actions disponibles sont :

- creer une depense ;
- lister les depenses ;
- consulter une depense ;
- valider une depense ;
- refuser une depense.

La fonctionnalite respecte une regle metier importante : une depense deja traitee ne peut pas etre validee ou refusee une deuxieme fois.

### 5.3 Mise en place de PostgreSQL

La persistance des donnees est geree avec PostgreSQL.

SQLAlchemy est utilise pour representer la table `expenses` dans le code Python.

La table contient notamment :

- l'identifiant de la depense ;
- l'identifiant de la PME ;
- le titre ;
- la categorie ;
- le montant ;
- la date ;
- le statut ;
- les informations du createur ;
- les informations de decision du comptable.

### 5.4 Interface frontend

Une interface React a ete ajoutee pour rendre la fonctionnalite utilisable.

L'interface permet :

- de saisir une depense ;
- de visualiser les depenses ;
- de rechercher une depense ;
- de filtrer par statut ;
- de consulter des indicateurs ;
- de valider ou refuser une depense.

Cette interface communique avec le backend FastAPI.

### 5.5 Tests unitaires

Des tests unitaires ont ete ajoutes avec Pytest.

Les tests verifient :

- la creation d'une depense ;
- la validation d'une depense ;
- le blocage d'une decision sur une depense deja traitee.

Resultat obtenu :

```text
3 passed
```

### 5.6 Integration continue

Une CI GitHub Actions a ete configuree.

Elle verifie :

- le lint backend avec Ruff ;
- les tests backend avec Pytest ;
- le lint frontend avec ESLint ;
- le build frontend avec Vite.

Cette automatisation permet de detecter rapidement les erreurs lors d'un push sur GitHub.

### 5.7 Preparation du staging

Un fichier `docker-compose.staging.yml` a ete cree pour preparer le deploiement sur un serveur de staging.

Le staging prevoit :

- un conteneur PostgreSQL ;
- un conteneur API FastAPI ;
- une configuration d'environnement dediee ;
- une documentation de deploiement.

Le deploiement reel sur VPS reste a effectuer au Sprint 2.

## 6. Documents produits

| Document | Description |
| --- | --- |
| `README.md` | Presentation globale du projet |
| `cahier-des-charges.md` | Cahier des charges initial |
| `docs/fonctionnalite-depenses.md` | Conception de la fonctionnalite depenses |
| `docs/deploiement-staging.md` | Guide de deploiement staging |
| `livrables/backlog.md` | Backlog mise a jour |
| `livrables/bilan-sprint-1.md` | Bilan du Sprint 1 |
| `livrables/planning-sprint-2.md` | Planning du Sprint 2 |

## 7. Difficultes rencontrees

Plusieurs difficultes ont ete rencontrees :

- conflit Git lors d'un pull depuis GitHub ;
- configuration de la CI ;
- probleme d'import Python dans les tests ;
- connexion entre frontend React et backend FastAPI ;
- necessite d'ajouter CORS ;
- Docker Desktop non demarre lors du test local du backend.

Ces difficultes ont ete corrigees ou documentees.

## 8. Retours pris en compte

Les retours du projet ont ete integres progressivement :

- passage d'un stockage simple a PostgreSQL ;
- ajout de tests unitaires ;
- ajout d'une configuration staging ;
- ajout d'une interface frontend ;
- mise a jour de la backlog ;
- preparation du Sprint 2 ;
- debut du dossier projet et du dossier professionnel.

## 9. Suite prevue

La suite du travail portera sur :

- l'authentification ;
- la gestion des roles ;
- la securisation des endpoints ;
- le test complet du staging ;
- la finalisation du frontend ;
- le debut d'une nouvelle fonctionnalite, probablement reporting ou facturation.

## 10. Conclusion

Le Bloc 1 est bien avance car le projet dispose deja d'une fonctionnalite concrete, d'une base technique structuree, de tests, d'une CI, d'une documentation et d'une preparation au deploiement.

Le travail realise montre une demarche professionnelle : analyse du besoin, conception, developpement, test, documentation et preparation de la suite du projet.

