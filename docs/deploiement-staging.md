# Deploiement staging - FinSmart Pro

## Choix de deploiement

Le deploiement staging propose utilise un VPS Ubuntu avec Docker et Docker Compose.

## Prerequis serveur

- VPS Ubuntu 22.04 ou 24.04
- Docker installe
- Docker Compose installe
- Port `8000` ouvert pour l'API
- Acces SSH au serveur

## Etapes de deploiement

### 1. Copier le projet sur le VPS

```bash
git clone https://github.com/Khaaoulaaa/FinSmart.git
cd FinSmart
```

### 2. Creer le fichier d'environnement staging

```bash
cp .env.staging.example .env
nano .env
```

Modifier au minimum :

```text
POSTGRES_PASSWORD=mot_de_passe_securise
```

### 3. Lancer PostgreSQL et l'API

```bash
docker compose -f docker-compose.staging.yml up --build -d
```

### 4. Verifier le deploiement

```bash
docker compose -f docker-compose.staging.yml ps
curl http://localhost:8000/health
```

Depuis le navigateur :

```text
http://IP_DU_VPS:8000/docs
```

## Mise a jour du staging

```bash
git pull origin main
docker compose -f docker-compose.staging.yml up --build -d
```

## Arret du staging

```bash
docker compose -f docker-compose.staging.yml down
```

