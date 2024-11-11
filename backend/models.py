from database import Base
from logger_config import logger
from sqlalchemy import JSON, Column, DateTime, Integer
from sqlalchemy.sql import func


class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)
    income_sources = Column(JSON, default=list)
    expenses = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f"<Budget(id={self.id})>"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        logger.info(
            f"Creating new Budget object with {len(kwargs.get('income_sources', []))} income sources and {len(kwargs.get('expenses', []))} expenses"
        )
