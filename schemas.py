from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, Field

from models import ExpenseStatus, InvoiceStatus, UserRole


class PmeRead(BaseModel):
    id: int
    name: str
    vat_number: str | None
    contact_email: str | None

    model_config = {"from_attributes": True}


class UserRead(BaseModel):
    id: int
    pme_id: int | None
    full_name: str
    email: str
    role: UserRole

    model_config = {"from_attributes": True}


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


class InvoiceCreate(BaseModel):
    pme_id: int = Field(..., ge=1)
    invoice_number: str = Field(..., min_length=3, max_length=40)
    client_name: str = Field(..., min_length=2, max_length=150)
    subject: str = Field(..., min_length=3, max_length=180)
    amount_ht: Decimal = Field(..., gt=0, decimal_places=2)
    vat_rate: Decimal = Field(default=Decimal("21.00"), ge=0, le=100, decimal_places=2)
    issue_date: date
    due_date: date
    status: InvoiceStatus = InvoiceStatus.draft
    notes: str | None = Field(default=None, max_length=500)


class InvoiceRead(BaseModel):
    id: int
    pme_id: int
    invoice_number: str
    client_name: str
    subject: str
    amount_ht: Decimal
    vat_rate: Decimal
    issue_date: date
    due_date: date
    status: InvoiceStatus
    notes: str | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
