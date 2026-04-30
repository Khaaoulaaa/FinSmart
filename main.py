from fastapi import FastAPI

app = FastAPI(
    title="FinSmart Pro API",
    description="API backend pour la plateforme SaaS FinSmart Pro.",
    version="0.1.0",
)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Bienvenue sur l'API FinSmart Pro"}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}