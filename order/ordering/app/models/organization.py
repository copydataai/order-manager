from sqlmodel import SQLModel, Field, Relationship


class Organization(SQLModel, table=True):
    organization_id: int | None = Field(default=None, primary_key=True, index=True)
    name: str = Field(nullable=False, index=True)
    location: str

    # TODO: add more contact_info as phone_number, email, etc.
    contact_info: str

    products: list["Product"] = Relationship(back_populates="organization")
