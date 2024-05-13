import uuid as uuid_pkg
from sqlmodel import SQLModel, Field, Relationship

from app.models.organization import Organization


class Roles(SQLModel, table=True):
    """Roles
    Enhance the scalability
    by creating the default roles and custom roles
    """

    role_id: int | None = Field(default=None, primary_key=True)
    name: str = Field(nullable=False, index=True)


class User(SQLModel, table=True):
    """A public version of user
    to enhance the mutability of the information
    like roles, name, auth.user
    """

    id: uuid_pkg.UUID = Field(primary_key=True, index=True)

    first_name: str = Field(max_length=255, nullable=True)

    last_name: str = Field(max_length=255, nullable=True)

    # TODO: look for integration with sqlmodel
    # for any extra details not allowed by the scheme
    # public_details: JSONB


class OrganizationUsers(SQLModel, table=True):
    """OrganizationUsers
    It's public version of users from auth
    """

    __tablename__ = "organization_users"

    organization_id: int | None = Field(
        default=None, foreign_key="organization.organization_id", primary_key=True
    )
    user_id: uuid_pkg.UUID = Field(
        default=None, foreign_key="user.id", primary_key=True
    )  # Reference to external User model
    role_id: int | None = Field(default=None, foreign_key="roles.role_id")

    organization: Organization = Relationship(
        back_populates="users", sa_relationship_kwargs={"cascade": "all, delete"}
    )

    role: Roles = Relationship(back_populates="users")
