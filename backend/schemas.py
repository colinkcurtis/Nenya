# schemas.py
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime

class IncomeSource(BaseModel):
    name: str
    amount: float
    frequency: str  # 'monthly' or 'annual'

class Expense(BaseModel):
    name: str
    amount: float
    category: str  # 'essential' or 'non-essential'

class BudgetCreate(BaseModel):
    income_sources: List[Dict]  # List of IncomeSource dicts
    expenses: List[Dict]        # List of Expense dicts

class BudgetResponse(BudgetCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True  # Enables ORM model -> Pydantic model conversion