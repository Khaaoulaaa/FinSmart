from collections.abc import Generator
from time import sleep

from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker
from sqlalchemy.pool import StaticPool

from config import settings


connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}
poolclass = StaticPool if settings.database_url.startswith("sqlite") else None

engine = create_engine(settings.database_url, connect_args=connect_args, poolclass=poolclass)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    for attempt in range(10):
        try:
            Base.metadata.create_all(bind=engine)
            return
        except OperationalError:
            if attempt == 9:
                raise
            sleep(1)
