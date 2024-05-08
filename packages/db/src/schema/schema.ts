import { pgTable, foreignKey, pgEnum, serial, integer, numeric, bigint, timestamp, varchar, index, uuid, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const requestStatus = pgEnum("request_status", ['PENDING', 'SUCCESS', 'ERROR'])
export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const typeorder = pgEnum("typeorder", ['EAT_IN', 'TAKEAWAY'])
export const statusorder = pgEnum("statusorder", ['FINISHED', 'CANCELLED', 'ORDERED'])


export const orderdetails = pgTable("orderdetails", {
	orderDetailId: serial("order_detail_id").primaryKey().notNull(),
	orderId: integer("order_id").notNull().references(() => order.orderId),
	productId: integer("product_id").notNull().references(() => product.productId),
	quantity: integer("quantity").notNull(),
	lineTotal: numeric("line_total").notNull(),
});

export const something = pgTable("something", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const alembicVersion = pgTable("alembic_version", {
	versionNum: varchar("version_num", { length: 32 }).primaryKey().notNull(),
});

export const roles = pgTable("roles", {
	roleId: serial("role_id").primaryKey().notNull(),
	name: varchar("name").notNull(),
},
(table) => {
	return {
		ixRolesName: index("ix_roles_name").on(table.name),
	}
});

export const user = pgTable("user", {
	userId: uuid("user_id").primaryKey().notNull(),
	name: varchar("name").notNull(),
	email: varchar("email").notNull(),
	phone: varchar("phone").notNull(),
},
(table) => {
	return {
		ixUserUserId: index("ix_user_user_id").on(table.userId),
	}
});

export const order = pgTable("order", {
	orderId: serial("order_id").primaryKey().notNull(),
	organizationId: integer("organization_id").notNull().references(() => organization.organizationId),
	orderDate: timestamp("order_date", { mode: 'string' }).notNull(),
	customerName: varchar("customer_name").notNull(),
	status: statusorder("status").notNull(),
	totalAmount: numeric("total_amount").notNull(),
},
(table) => {
	return {
		ixOrderCustomerName: index("ix_order_customer_name").on(table.customerName),
		ixOrderOrderDate: index("ix_order_order_date").on(table.orderDate),
		ixOrderOrganizationId: index("ix_order_organization_id").on(table.organizationId),
		ixOrderStatus: index("ix_order_status").on(table.status),
		ixOrderTotalAmount: index("ix_order_total_amount").on(table.totalAmount),
	}
});

export const organization = pgTable("organization", {
	organizationId: serial("organization_id").primaryKey().notNull(),
	name: varchar("name").notNull(),
	location: varchar("location").notNull(),
	contactInfo: varchar("contact_info").notNull(),
},
(table) => {
	return {
		ixOrganizationName: index("ix_organization_name").on(table.name),
		ixOrganizationOrganizationId: index("ix_organization_organization_id").on(table.organizationId),
	}
});

export const product = pgTable("product", {
	productId: serial("product_id").primaryKey().notNull(),
	name: varchar("name").notNull(),
	description: varchar("description").notNull(),
	price: numeric("price").notNull(),
	organizationId: integer("organization_id").references(() => organization.organizationId),
});

export const organizationUsers = pgTable("organization_users", {
	organizationId: integer("organization_id").notNull().references(() => organization.organizationId),
	userId: uuid("user_id").notNull().references(() => user.userId),
	roleId: integer("role_id").references(() => roles.roleId),
},
(table) => {
	return {
		organizationUsersPkey: primaryKey({ columns: [table.organizationId, table.userId], name: "organization_users_pkey"})
	}
});