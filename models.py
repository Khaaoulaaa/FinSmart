from datetime import date, datetime
from decimal import Decimal
from enum import Enum

from sqlalchemy import Date, DateTime
from sqlalchemy import Enum as SqlEnum
from sqlalchemy import Integer, Numeric, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class ExpenseStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"


class Expense(Base):
    __tablename__ = "expenses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    pme_id: Mapped[int] = mapped_column(Integer, index=True)
    title: Mapped[str] = mapped_column(String(150))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    category: Mapped[str] = mapped_column(String(100), index=True)
    amount: Mapped[Decimal] = mapped_column(Numeric(12, 2))
    expense_date: Mapped[date] = mapped_column(Date)
    receipt_url: Mapped[str | None] = mapped_column(String(255), nullable=True)
    status: Mapped[ExpenseStatus] = mapped_column(
        SqlEnum(ExpenseStatus),
        default=ExpenseStatus.pending,
        index=True,
    )
    created_by_role: Mapped[str] = mapped_column(String(50), default="gerant_pme")
    created_by_name: Mapped[str] = mapped_column(String(100))
    decision_by_role: Mapped[str | None] = mapped_column(String(50), nullable=True)
    decision_by_name: Mapped[str | None] = mapped_column(String(100), nullable=True)
    decision_comment: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
