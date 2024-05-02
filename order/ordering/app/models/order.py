from sqlmodel import SQLModel, Field
from datetime import datetime
from enum import Enum


class TypeOrder(str, Enum):
    """TypeOrder a binary value EAT_IN or TAKEAWAY"""

    EAT_IN = "EAT IN"
    TAKEAWAY = "TAKE AWAY"


class StatusOrder(str, Enum):
    FINISHED = "FINISHED"
    # TODO: Add processing with a track system
    # PROCESSING = "PROCESSING"
    CANCELLED = "CANCELLED"
    ORDERED = "ORDERED"


class Order(SQLModel, table=True):
    """Order model is the base model to take an order"""

    order_id: int | None = Field(default=None, primary_key=True)

    organization_id: int = Field(foreign_key="Organization.organization_id", index=True)

    order_date: datetime = Field(default=datetime.now(), index=True)

    customer_name: str = Field(index=True)

    status: StatusOrder = Field(default=StatusOrder.ORDERED, index=True)

    total_amount: float = Field(default=0.0, index=True)


class OrderDetails(SQLModel, table=True):
    Order_detail_id: int | None = Field(default=None, primary_key=True)

    order_id: int = Field(foreign_key="Order.order_id")
    product_id: int = Field(foreign_key="Product.product_id")

    quantity: int = Field(gt=0)
    line_total: float = Field(gt=0.0)

    # TODO: add feature to add TypeOrder
    # type: TypeOrder = Field(default=TypeOrder.EAT_IN, index=True)

    # TODO: Add future paid
    # paid: bool = Field(default=False, index=True)
