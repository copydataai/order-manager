"""create func handle_new_user

Revision ID: 5cf66febbdfa
Revises: a565300c9f26
Create Date: 2024-05-13 22:37:25.575654

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = "5cf66febbdfa"
down_revision: Union[str, None] = "a565300c9f26"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute(
        """
            CREATE FUNCTION public.handle_new_user()
            RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
            SET search_path = ''
            AS $$
            BEGIN
                INSERT INTO public.user (id, first_name, last_name)
                VALUES (NEW.id, NEW.raw_user_meta_data ->> 'first_name', NEW.raw_user_meta_data ->> 'last_name');
                RETURN NEW;
            END;
            $$;
        """
    )


def downgrade() -> None:
    op.execute(
        """
            DROP FUNCTION public.handle_new_user();
        """
    )
