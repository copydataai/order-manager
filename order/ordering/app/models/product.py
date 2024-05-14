from decimal import Decimal
from enum import Enum
from sqlmodel import SQLModel, Field, Relationship


class StatusStock(Enum):
    AVAILABLE = "AVAILABLE"
    LIMITED = "LIMITED"
    OUT_OF_STOCK = "OUT_OF_STOCK"


class Product(SQLModel, table=True):

    product_id: int | None = Field(default=None, primary_key=True)
    name: str = Field(max_length=255)
    description: str = Field(max_length=5000)

    price: Decimal = Field(gt=0, decimal_places=2)

    organization_id: int | None = Field(
        default=None, foreign_key="organization.organization_id"
    )

    organization: "Organization" = Relationship(back_populates="products")
