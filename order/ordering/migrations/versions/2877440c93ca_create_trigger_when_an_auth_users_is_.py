"""create trigger when an auth.users is created

Revision ID: 2877440c93ca
Revises: 5cf66febbdfa
Create Date: 2024-05-13 22:40:10.422586

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = "2877440c93ca"
down_revision: Union[str, None] = "5cf66febbdfa"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute(
        """
        CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
        """
    )


def downgrade() -> None:
    op.execute(
        """
        DROP TRIGGER on_auth_user_created ON auth.users;
        """
    )
