# Cahier des charges - FinSmart Pro

## 1. Présentation du projet

### Nom du projet

FinSmart Pro

### Client

Cabinet **Expertise & Conseil**

### Type de projet

Application SaaS de gestion financière pour PME.

### Contexte

Les PME accompagnées par le cabinet Expertise & Conseil utilisent souvent plusieurs outils séparés pour gérer leur comptabilité, leurs factures, leur trésorerie et leurs rapports financiers. Cette organisation peut entraîner une perte de temps, des erreurs de saisie et un manque de visibilité sur la situation financière.

FinSmart Pro vise à centraliser ces fonctionnalités dans une plateforme moderne, accessible et sécurisée.

## 2. Objectifs du projet

L'objectif principal est de simplifier la gestion financière des entreprises clientes du cabinet.

Objectifs détaillés :

- réduire le temps passé sur les tâches administratives ;
- centraliser les données comptables et financières ;
- automatiser certains calculs et documents ;
- améliorer le suivi de la trésorerie ;
- fournir des tableaux de bord clairs pour la prise de décision ;
- permettre un accès multi-utilisateurs avec des permissions adaptées.

## 3. Périmètre fonctionnel

### Comptabilité

- Création et consultation des écritures comptables.
- Classement des opérations par compte.
- Génération automatique d'un bilan simplifié.
- Suivi des charges et produits.

### Facturation

- Création de devis.
- Transformation d'un devis en facture.
- Suivi du statut des factures : brouillon, envoyée, payée, en retard.
- Relances clients.

### Trésorerie

- Suivi des entrées et sorties d'argent.
- Prévisions de trésorerie.
- Rapprochement bancaire.
- Alertes en cas de solde prévisionnel faible.

### Reporting

- Tableaux de bord financiers.
- Indicateurs clés : chiffre d'affaires, dépenses, marge, factures impayées.
- Export Excel des données.

### Gestion des utilisateurs

- Création de comptes utilisateurs.
- Attribution de rôles : administrateur, comptable, client, lecteur.
- Gestion des permissions selon le rôle.

## 4. Périmètre non fonctionnel

### Sécurité

- Authentification obligatoire.
- Gestion des droits d'accès.
- Protection des données sensibles.
- Préparation à l'utilisation du HTTPS en production.

### Performance

- Temps de réponse rapide pour les actions principales.
- Architecture adaptée à plusieurs entreprises clientes.

### Disponibilité

- Application accessible via navigateur web.
- Déploiement prévu sur un environnement Linux.

### Maintenabilité

- Code organisé entre frontend, backend et base de données.
- Utilisation de GitHub pour le versioning.
- Mise en place d'une CI avec GitHub Actions.

## 5. Contraintes techniques

| Élément | Choix technique |
| --- | --- |
| Backend | Python FastAPI |
| Frontend | React |
| Base de données | PostgreSQL |
| Conteneurisation | Docker |
| CI/CD | GitHub Actions |
| Système cible | Linux |

## 6. Architecture prévisionnelle

```text
Utilisateur
    |
    v
Frontend React
    |
    v
API FastAPI
    |
    v
Base de données PostgreSQL
```

## 7. Livrables attendus

- Dépôt GitHub initialisé.
- README professionnel.
- Cahier des charges.
- Dockerfile de démarrage.
- Pipeline CI GitHub Actions.
- Base backend FastAPI.
- Documentation technique minimale.

## 8. Planning prévisionnel

| Phase | Description |
| --- | --- |
| Phase 1 | Initialisation du dépôt et documentation |
| Phase 2 | Mise en place du backend FastAPI |
| Phase 3 | Connexion à PostgreSQL |
| Phase 4 | Développement des modules fonctionnels |
| Phase 5 | Création du frontend React |
| Phase 6 | Tests, Docker et CI/CD |
| Phase 7 | Préparation de la présentation finale |

## 9. Critères de réussite

- Le dépôt GitHub contient une structure claire.
- Le README explique le projet et le démarrage local.
- Le backend FastAPI démarre correctement.
- Le Dockerfile permet de lancer l'API.
- Le pipeline CI s'exécute automatiquement sur GitHub.
- Le cahier des charges présente clairement le besoin, les fonctionnalités et les contraintes.

