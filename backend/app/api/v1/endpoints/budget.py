from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api import deps
from app.schemas.budget import BudgetCreate, BudgetResponse
from app.models.budget import MonthlyBudget

router = APIRouter()

@router.post("/budget", response_model=BudgetResponse)
def create_budget(
    budget: BudgetCreate,
    db: Session = Depends(deps.get_db),
):
    db_budget = MonthlyBudget(
        income_sources=budget.income_sources,
        expenses=budget.expenses
    )
    db.add(db_budget)
    db.commit()
    db.refresh(db_budget)
    
    # Calculate totals
    total_income = sum(db_budget.income_sources.values())
    total_expenses = sum(db_budget.expenses.values())
    
    return {
        **db_budget.__dict__,
        "total_income": total_income,
        "total_expenses": total_expenses,
        "net_income": total_income - total_expenses
    }

@router.get("/budget/current", response_model=BudgetResponse)
def get_current_budget(
    db: Session = Depends(deps.get_db),
):
    budget = db.query(MonthlyBudget).order_by(MonthlyBudget.month.desc()).first()
    if not budget:
        raise HTTPException(status_code=404, detail="No budget found")
    
    total_income = sum(budget.income_sources.values())
    total_expenses = sum(budget.expenses.values())
    
    return {
        **budget.__dict__,
        "total_income": total_income,
        "total_expenses": total_expenses,
        "net_income": total_income - total_expenses
    }