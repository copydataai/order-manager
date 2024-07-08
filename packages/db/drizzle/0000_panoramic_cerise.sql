-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"role_id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar,
	"last_name" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orderdetails" (
	"order_detail_id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"line_total" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"order_id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer NOT NULL,
	"order_date" timestamp NOT NULL,
	"customer_name" varchar NOT NULL,
	"status" "statusorder" NOT NULL,
	"total_amount" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization" (
	"organization_id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"location" varchar NOT NULL,
	"contact_info" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"product_id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"price" numeric NOT NULL,
	"organization_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_users" (
	"organization_id" integer NOT NULL,
	"user_id" uuid NOT NULL,
	"role_id" integer,
	CONSTRAINT "organization_users_pkey" PRIMARY KEY("organization_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderdetails" ADD CONSTRAINT "orderdetails_order_id_order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderdetails" ADD CONSTRAINT "orderdetails_product_id_product_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_organization_id_organization_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("organization_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_organization_id_organization_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("organization_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_organization_id_organization_organization_id" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("organization_id") ON DELETE no action ON UPDATE no action;
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
DO $$ BEGIN
 ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_roles_name" ON "roles" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_user_id" ON "user" USING btree ("id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_order_customer_name" ON "order" USING btree ("customer_name" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_order_order_date" ON "order" USING btree ("order_date" timestamp_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_order_organization_id" ON "order" USING btree ("organization_id" int4_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_order_status" ON "order" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_order_total_amount" ON "order" USING btree ("total_amount" numeric_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_organization_name" ON "organization" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ix_organization_organization_id" ON "organization" USING btree ("organization_id" int4_ops);
