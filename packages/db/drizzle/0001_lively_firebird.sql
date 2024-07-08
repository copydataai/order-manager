ALTER TABLE "organization_users" DROP CONSTRAINT "organization_users_organization_id_organization_organization_id";
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
ALTER TABLE "product" ADD COLUMN "image_url" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_organization_id_organization_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("organization_id") ON DELETE no action ON UPDATE no action;
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