from typing import List

from database import get_db
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from logger_config import logger
from models import Budget
from schemas import BudgetCreate, BudgetResponse
from sqlalchemy.orm import Session

app = FastAPI(title="Nenya Financial")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response


@app.get("/api/v1/budget/current", response_model=BudgetResponse)
def get_current_budget(db: Session = Depends(get_db)):
    logger.info("Fetching current budget")
    try:
        budget = db.query(Budget).order_by(Budget.created_at.desc()).first()
        if not budget:
            logger.info("No budget found, returning empty template")
            return {"income_sources": [], "expenses": []}
        logger.info(f"Retrieved budget id: {budget.id}")
        return budget
    except Exception as e:
        logger.error(f"Error fetching budget: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")


@app.post("/api/v1/budget", response_model=BudgetResponse)
def create_or_update_budget(budget: BudgetCreate, db: Session = Depends(get_db)):
    logger.info("Creating new budget entry")
    try:
        db_budget = Budget(
            income_sources=budget.income_sources, expenses=budget.expenses
        )
        db.add(db_budget)
        db.commit()
        db.refresh(db_budget)
        logger.info(f"Created budget id: {db_budget.id}")
        return db_budget
    except Exception as e:
        logger.error(f"Error creating budget: {str(e)}", exc_info=True)
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")
