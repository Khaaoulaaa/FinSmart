# Planning Sprint 2 - FinSmart Pro

## Objectif general

Le Sprint 2 a pour objectif de finaliser la gestion des depenses en conditions plus realistes, notamment avec l'authentification, les roles utilisateurs, la securisation des actions et le test du deploiement staging.

## Duree proposee

Duree indicative : 1 a 2 semaines.

## Objectifs principaux

- finaliser l'integration frontend/backend ;
- ajouter l'authentification ;
- mettre en place les roles Admin, Gerant PME et Comptable ;
- securiser les routes sensibles ;
- tester le deploiement staging ;
- commencer la fonctionnalite suivante si les elements precedents sont termines.

## Backlog Sprint 2

| ID | Tache | Priorite | Resultat attendu |
| --- | --- | --- | --- |
| S2-01 | Finaliser le test complet frontend + backend + PostgreSQL | Haute | Interface React fonctionnelle avec API locale |
| S2-02 | Ajouter l'authentification | Haute | Connexion utilisateur simple |
| S2-03 | Ajouter les roles utilisateurs | Haute | Admin, Gerant PME, Comptable |
| S2-04 | Securiser la creation de depense | Haute | Seul le Gerant PME peut creer une depense |
| S2-05 | Securiser validation/refus | Haute | Seul le Comptable peut valider/refuser |
| S2-06 | Ajouter gestion categories | Moyenne | Categories gerees proprement |
| S2-07 | Tester Docker Compose staging | Moyenne | API accessible en environnement staging |
| S2-08 | Mettre a jour la documentation | Moyenne | Livrables synchronises avec le code |
| S2-09 | Commencer reporting simple | Basse | Premier indicateur financier si temps disponible |

## Planning detaille

| Jour | Travail prevu |
| --- | --- |
| Jour 1 | Verification Sprint 1, nettoyage backlog, test local backend/frontend |
| Jour 2 | Mise en place authentification simple |
| Jour 3 | Ajout des roles et adaptation du modele utilisateur |
| Jour 4 | Securisation des endpoints depenses |
| Jour 5 | Tests unitaires des roles et permissions |
| Jour 6 | Verification staging avec Docker Compose |
| Jour 7 | Documentation et preparation du rendu Sprint 2 |

## Elements reportes du Sprint 1

- deploiement reel sur VPS ;
- authentification ;
- gestion des roles ;
- securisation des endpoints ;
- finalisation du test complet de l'interface React avec l'API.

## Risques identifies

| Risque | Impact | Solution prevue |
| --- | --- | --- |
| Probleme Docker Desktop ou VPS | Retard staging | Prevoir un deploiement local documente si VPS indisponible |
| Authentification trop complexe | Retard Sprint 2 | Commencer par une authentification simple |
| Gestion des roles incomplete | Risque fonctionnel | Prioriser Comptable et Gerant PME |
| CI frontend qui echoue | Blocage GitHub | Tester `npm run lint` et `npm run build` en local |

## Definition of Done Sprint 2

Le Sprint 2 sera considere comme termine si :

- le frontend communique correctement avec le backend ;
- les utilisateurs ont des roles ;
- les endpoints sensibles sont proteges ;
- les tests passent ;
- la CI GitHub Actions passe ;
- la documentation est mise a jour ;
- le staging est teste ou documente avec preuves de tentative.

## Etat de cloture

Le Sprint 2 est cloture pour le prototype au 04/06/2026.

| Critere | Etat | Commentaire |
| --- | --- | --- |
| Frontend connecte au backend | Valide | React consomme les endpoints FastAPI |
| Roles utilisateurs | Valide | Admin, Gerant PME et Comptable presents |
| Authentification simple | Valide | Endpoint `POST /auth/login` ajoute |
| Routes sensibles protegees | Valide pour prototype | Controle par role avec header demo `X-User-Email` |
| Tests associes | Valide | 12 tests backend passent |
| Build frontend | Valide | `npm run build` passe |
| Documentation | Valide | Backlog et bilan Sprint 2 mis a jour |
| Staging/deploiement | Documente | Configuration et documentation disponibles, URL finale a stabiliser |

Les elements de securite production, comme le token, la session et le hash reel des mots de passe, sont reportes vers le Sprint 3 ou une phase de durcissement.

