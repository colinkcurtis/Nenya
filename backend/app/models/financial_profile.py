from sqlalchemy import Column, Integer, String, Float, JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class FinancialProfile(Base):
    __tablename__ = "financial_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, default="Primary Profile")
    
    # Core monthly data
    monthly_income = Column(JSON)  # Store income sources as JSON
    monthly_expenses = Column(JSON)  # Store expense categories as JSON
    
    # Assets and Liabilities
    assets = Column(JSON)  # Store different asset types and values
    liabilities = Column(JSON)  # Store different liability types and values
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # For historical tracking
    snapshot_date = Column(DateTime(timezone=True))