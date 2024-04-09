from sqlmodel import SQLModel, Field
from datetime import datetime
from enum import Enum


class TypeOrder(str, Enum):
    """TypeOrder a binary value EAT_IN or TAKEAWAY"""

    EAT_IN = "EAT IN"
    TAKEAWAY = "TAKE AWAY"


class StatusOrder(str, Enum):
    FINISHED = "FINISHED"
    PROCESSING = "PROCESSING"
    CANCELLED = "CANCELLED"
    ORDERED = "ORDERED"


class Order(SQLModel, table=True):
    """Order model is the base model to take an order"""

    id: int = Field(primary_key=True, unique=True)
    status: StatusOrder = Field(default=StatusOrder.ORDERED, index=True)

    customer: str
    # date is represented in the format YYYY-MM-DD
    date: str
    # time is represented in the format HH:MM
    time: datetime = Field(default=datetime.now().strftime("%H:%M"))

    type: TypeOrder = Field(default=TypeOrder.EAT_IN, index=True)

    price: float = Field(nullable=False)
    paid: bool = Field(default=False, index=True)

    created_at: datetime = Field(default=datetime.now())
    modified_at: datetime = Field(default=datetime.now())
