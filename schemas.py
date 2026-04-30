from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, Field

from models import ExpenseStatus


class ExpenseCreate(BaseModel):
    pme_id: int = Field(..., ge=1)
    title: str = Field(..., min_length=3, max_length=150)
    description: str | None = None
    category: str = Field(..., min_length=2, max_length=100)
    amount: Decimal = Field(..., gt=0, decimal_places=2)
    expense_date: date
    receipt_url: str | None = Field(default=None, max_length=255)
    created_by_name: str = Field(..., min_length=2, max_length=100)


class ExpenseDecision(BaseModel):
    decision_by_name: str = Field(..., min_length=2, max_length=100)
    comment: str | None = Field(default=None, max_length=500)


class ExpenseRead(BaseModel):
    id: int
    pme_id: int
    title: str
    description: str | None
    category: str
    amount: Decimal
    expense_date: date
    receipt_url: str | None
    status: ExpenseStatus
    created_by_role: str
    created_by_name: str
    decision_by_role: str | None
    decision_by_name: str | None
    decision_comment: str | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
