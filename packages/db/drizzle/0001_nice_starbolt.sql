DO $$ BEGIN
 CREATE TYPE "public"."aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."action" AS ENUM('INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."equality_op" AS ENUM('eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."one_time_token_type" AS ENUM('confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."request_status" AS ENUM('PENDING', 'SUCCESS', 'ERROR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DROP TABLE "waitlist";--> statement-breakpoint
DROP TABLE "alembic_version";--> statement-breakpoint
ALTER TABLE "organization_users" DROP CONSTRAINT "organization_users_organization_id_fkey";
--> statement-breakpoint
ALTER TABLE "organization_users" DROP CONSTRAINT "organization_users_role_id_fkey";
--> statement-breakpoint
ALTER TABLE "organization_users" DROP CONSTRAINT "organization_users_user_id_fkey";
--> statement-breakpoint
DROP INDEX IF EXISTS "ix_roles_name";--> statement-breakpoint
DROP INDEX IF EXISTS "ix_user_id";--> statement-breakpoint
DROP INDEX IF EXISTS "ix_order_customer_name";--> statement-breakpoint
DROP INDEX IF EXISTS "ix_order_order_date";--> statement-breakpoint
DROP INDEX IF EXISTS "ix_order_organization_id";--> statement-breakpoint
DROP INDEX IF EXISTS "ix_order_status";--> statement-breakpoint
DROP INDEX IF EXISTS "ix_order_total_amount";--> statement-breakpoint
DROP INDEX IF EXISTS "ix_organization_name";--> statement-breakpoint
DROP INDEX IF EXISTS "ix_organization_organization_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_organization_id_organization_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("organization_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_role_id_roles_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("role_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_roles_name" ON "roles" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_user_id" ON "user" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_order_customer_name" ON "order" USING btree ("customer_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_order_order_date" ON "order" USING btree ("order_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_order_organization_id" ON "order" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_order_status" ON "order" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_order_total_amount" ON "order" USING btree ("total_amount");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_organization_name" ON "organization" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_organization_organization_id" ON "organization" USING btree ("organization_id");