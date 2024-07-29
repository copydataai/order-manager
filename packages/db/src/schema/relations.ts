import { relations } from "drizzle-orm/relations";

import {
	Order,
	OrderDetails,
	Organization,
	OrganizationUsers,
	Product,
	Roles,
	User,
} from "./schema";

export const orderdetailsRelations = relations(OrderDetails, ({ one }) => ({
	order: one(Order, {
		fields: [OrderDetails.orderId],
		references: [Order.orderId],
	}),
	product: one(Product, {
		fields: [OrderDetails.productId],
		references: [Product.productId],
	}),
}));

export const orderRelations = relations(Order, ({ one, many }) => ({
	orderdetails: many(OrderDetails),
	organization: one(Organization, {
		fields: [Order.organizationId],
		references: [Organization.organizationId],
	}),
}));

export const productRelations = relations(Product, ({ one, many }) => ({
	orderdetails: many(OrderDetails),
	organization: one(Organization, {
		fields: [Product.organizationId],
		references: [Organization.organizationId],
	}),
}));

export const organizationRelations = relations(Organization, ({ many }) => ({
	orders: many(Order),
	products: many(Product),
	organizationUsers: many(OrganizationUsers),
}));

export const organizationUsersRelations = relations(
	OrganizationUsers,
	({ one }) => ({
		organization: one(Organization, {
			fields: [OrganizationUsers.organizationId],
			references: [Organization.organizationId],
		}),
		role: one(Roles, {
			fields: [OrganizationUsers.roleId],
			references: [Roles.roleId],
		}),
		user: one(User, {
			fields: [OrganizationUsers.userId],
			references: [User.id],
		}),
	}),
);

export const rolesRelations = relations(Roles, ({ many }) => ({
	organizationUsers: many(OrganizationUsers),
}));

export const userRelations = relations(User, ({ many }) => ({
	organizationUsers: many(OrganizationUsers),
}));
