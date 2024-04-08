from pydantic import BaseModel
from enum import Enum


class TypeOrder(Enum):
    """TypeOrder a binary value EAT_IN or TAKEAWAY"""

    EAT_IN = 1
    TAKEAWAY = 2


class StatusOrder(Enum):
    FINISHED = 1
    PROCESSING = 2
    CANCELLED = 3
    ORDERED = 4


class Order(BaseModel):
    """Order model is the base model to take an order"""

    id: int
    status: StatusOrder

    customer: str
    # date is represented in the format YYYY-MM-DD
    date: str
    # time is represented in the format HH:MM
    time: str

    type: TypeOrder

    price: float
    paid: bool

    created_at: str
    modified_at: str
