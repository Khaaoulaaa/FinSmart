# Dockerfile pour FastAPI
FROM python:3.11-slim

# Crée un dossier de travail
WORKDIR /app

# Copie les fichiers requirements.txt (tu devras créer ce fichier)
COPY requirements.txt .

# Installe les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie tout le code de l'application
COPY . .

# Expose le port FastAPI
EXPOSE 8000

# Commande pour démarrer l'application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]