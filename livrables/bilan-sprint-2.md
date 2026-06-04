# Bilan Sprint 2 - FinSmart Pro

## Objectif du sprint

Le Sprint 2 avait pour objectif de rendre l'application plus exploitable en conditions realistes : connexion utilisateur, roles, protection des actions principales, donnees de demonstration, tests associes et mise a jour de la backlog.

## Fonctionnalites realisees

| Element | Statut | Detail |
| --- | --- | --- |
| Integration frontend/backend | Termine | Le frontend React communique avec l'API FastAPI locale |
| Authentification demo | Termine pour le prototype | Endpoint `POST /auth/login` et verification du mot de passe demo |
| Roles utilisateurs | Termine pour le prototype | Roles `admin`, `gerant_pme` et `comptable` presents dans le modele et les donnees |
| Protection des routes sensibles | Termine pour le prototype | Controle par role sur creation depense, validation/refus et creation facture |
| Categories de depenses | Termine | Endpoint `GET /expense-categories` et utilisation dans le formulaire React |
| Donnees PostgreSQL de demonstration | Termine | PME, utilisateurs, depenses et factures inserees par script |
| Facturation de base | En cours avance | Modele, endpoints, interface et tests API disponibles |
| Tests associes | Termine pour le sprint | 12 tests backend passent avec Pytest |
| Qualite backend | Termine | `ruff check .` passe |
| Build frontend | Termine | `npm run build` passe |
| Backlog GitHub | Termine | Tickets mis a jour, tickets termines fermes lorsque le perimetre est couvert |

## Tests effectues

Commandes executees :

```powershell
pytest
ruff check .
cd frontend
npm run build
```

Resultats :

- `pytest` : 12 tests passent ;
- `ruff check .` : aucune erreur ;
- `npm run build` : build React valide.

## Tickets GitHub concernes

| Ticket | Statut |
| --- | --- |
| `#4` Gestion des depenses | Termine |
| `#7` Categories de depenses | Termine |
| `#2` Authentification utilisateur | En cours avance |
| `#8` Tests et validation fonctionnelle | En cours avance |
| `#10` Corrections UI et responsive | En cours |
| `#11` Module facturation clients | En cours avance |

## Limites et reports

Les elements suivants ne sont pas supprimes, mais sont reportes vers le Sprint 3 ou une phase de durcissement technique :

- authentification complete avec token ou session ;
- hash et verification reelle des mots de passe ;
- administration complete des categories ;
- generation PDF des factures ;
- dashboard reporting avec graphiques ;
- deploiement public final si l'URL n'est pas encore stabilisee.

## Conclusion

Le Sprint 2 est considere comme cloture pour le prototype. L'application dispose maintenant d'un parcours complet plus solide : connexion demo, roles, depenses, categories, facturation de base, tests associes et backlog mise a jour.

Le Sprint 3 pourra se concentrer sur le reporting, le dashboard, la finalisation de la facturation et le renforcement de la securite.
