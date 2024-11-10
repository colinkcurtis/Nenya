from pydantic import BaseModel
from typing import Dict, Optional
from datetime import datetime

class BudgetCreate(BaseModel):
    income_sources: Dict[str, float]  # e.g., {"Salary": 5000, "Side Gig": 1000}
    expenses: Dict[str, float]        # e.g., {"Rent": 2000, "Utilities": 300}

class BudgetResponse(BaseModel):
    id: int
    income_sources: Dict[str, float]
    expenses: Dict[str, float]
    total_income: float
    total_expenses: float
    net_income: float
    month: datetime
    
    class Config:
        from_attributes = True