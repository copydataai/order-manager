import { sql } from "drizzle-orm";
import {
	foreignKey,
	index,
	integer,
	numeric,
	pgEnum,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const typeorder = pgEnum("typeorder", ["EAT_IN", "TAKEAWAY"]);
export const statusorder = pgEnum("statusorder", [
	"FINISHED",
	"CANCELLED",
	"ORDERED",
]);
export const Roles = pgTable(
	"roles",
	{
		roleId: serial("role_id").primaryKey().notNull(),
		name: varchar("name").notNull(),
	},
	(table) => {
		return {
			ixRolesName: index("ix_roles_name").on(table.name),
		};
	},
);

export const User = pgTable(
	"user",
	{
		id: uuid("id").primaryKey().notNull(),
		firstName: varchar("first_name"),
		lastName: varchar("last_name"),
	},
	(table) => {
		return {
			ixUserId: index("ix_user_id").on(table.id),
		};
	},
);

export const OrderDetails = pgTable("orderdetails", {
	orderDetailId: serial("order_detail_id").primaryKey().notNull(),
	orderId: integer("order_id")
		.notNull()
		.references(() => Order.orderId),
	productId: integer("product_id")
		.notNull()
		.references(() => Product.productId),
	quantity: integer("quantity").notNull(),
	lineTotal: numeric("line_total").notNull(),
});

export const Order = pgTable(
	"order",
	{
		orderId: serial("order_id").primaryKey().notNull(),
		organizationId: integer("organization_id")
			.notNull()
			.references(() => Organization.organizationId),
		orderDate: timestamp("order_date", { mode: "string" }).notNull(),
		customerName: varchar("customer_name").notNull(),
		status: statusorder("status").notNull(),
		totalAmount: numeric("total_amount").notNull(),
	},
	(table) => {
		return {
			ixOrderCustomerName: index("ix_order_customer_name").on(
				table.customerName,
			),
			ixOrderOrderDate: index("ix_order_order_date").on(table.orderDate),
			ixOrderOrganizationId: index("ix_order_organization_id").on(
				table.organizationId,
			),
			ixOrderStatus: index("ix_order_status").on(table.status),
			ixOrderTotalAmount: index("ix_order_total_amount").on(table.totalAmount),
		};
	},
);

export const Organization = pgTable(
	"organization",
	{
		organizationId: serial("organization_id").primaryKey().notNull(),
		name: varchar("name").notNull(),
		location: varchar("location").notNull(),
		contactInfo: varchar("contact_info").notNull(),
	},
	(table) => {
		return {
			ixOrganizationName: index("ix_organization_name").on(table.name),
			ixOrganizationOrganizationId: index("ix_organization_organization_id").on(
				table.organizationId,
			),
		};
	},
);

export const Product = pgTable("product", {
	productId: serial("product_id").primaryKey().notNull(),
	name: varchar("name").notNull(),
	description: varchar("description").notNull(),
	price: numeric("price").notNull(),
	imageUrl: text("image_url"),
	organizationId: integer("organization_id").references(
		() => Organization.organizationId,
	),
});

export const OrganizationUsers = pgTable(
	"organization_users",
	{
		organizationId: integer("organization_id")
			.notNull()
			.references(() => Organization.organizationId),
		userId: uuid("user_id")
			.notNull()
			.references(() => User.id),
		roleId: integer("role_id").references(() => Roles.roleId),
	},
	(table) => {
		return {
			organizationUsersPkey: primaryKey({
				columns: [table.organizationId, table.userId],
				name: "organization_users_pkey",
			}),
		};
	},
);
