import os

from logger_config import logger
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database configuration
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@localhost/nenja"

# Log only once per process
process_id = os.getpid()
logger.info(
    f"Process {process_id}: Initializing database connection to: {SQLALCHEMY_DATABASE_URL}"
)

# Create engine and session factory
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True,  # Enables connection health checks
    pool_size=5,  # Connection pool size per worker
    max_overflow=10,  # Max number of connections to overflow
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

logger.info(f"Process {process_id}: Database connection established")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
