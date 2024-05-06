from sqlmodel import SQLModel, Field
from datetime import datetime
from enum import Enum
from decimal import Decimal


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

    organization_id: int = Field(foreign_key="organization.organization_id", index=True)

    order_date: datetime = Field(default=datetime.now(), index=True)

    customer_name: str = Field(index=True)

    status: StatusOrder = Field(default=StatusOrder.ORDERED, index=True)

    total_amount: Decimal = Field(default=0.0, index=True, decimal_places=2)


class OrderDetails(SQLModel, table=True):
    order_detail_id: int | None = Field(default=None, primary_key=True)

    order_id: int = Field(foreign_key="order.order_id")
    product_id: int = Field(foreign_key="product.product_id")

    quantity: int = Field(gt=0)

    # The total of a line of product = quantity * product. price
    line_total: Decimal = Field(gt=0.0, decimal_places=2)

    # TODO: add feature to add TypeOrder
    # type: TypeOrder = Field(default=TypeOrder.EAT_IN, index=True)

    # TODO: Add future paid
    # paid: bool = Field(default=False, index=True)
