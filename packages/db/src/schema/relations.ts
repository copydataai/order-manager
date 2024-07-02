import { relations } from "drizzle-orm/relations";

import {
	order,
	orderdetails,
	organization,
	organizationUsers,
	product,
	roles,
	user,
} from "./schema";

export const orderdetailsRelations = relations(orderdetails, ({ one }) => ({
	order: one(order, {
		fields: [orderdetails.orderId],
		references: [order.orderId],
	}),
	product: one(product, {
		fields: [orderdetails.productId],
		references: [product.productId],
	}),
}));

export const orderRelations = relations(order, ({ one, many }) => ({
	orderdetails: many(orderdetails),
	organization: one(organization, {
		fields: [order.organizationId],
		references: [organization.organizationId],
	}),
}));

export const productRelations = relations(product, ({ one, many }) => ({
	orderdetails: many(orderdetails),
	organization: one(organization, {
		fields: [product.organizationId],
		references: [organization.organizationId],
	}),
}));

export const organizationRelations = relations(organization, ({ many }) => ({
	orders: many(order),
	products: many(product),
	organizationUsers: many(organizationUsers),
}));

export const organizationUsersRelations = relations(
	organizationUsers,
	({ one }) => ({
		organization: one(organization, {
			fields: [organizationUsers.organizationId],
			references: [organization.organizationId],
		}),
		role: one(roles, {
			fields: [organizationUsers.roleId],
			references: [roles.roleId],
		}),
		user: one(user, {
			fields: [organizationUsers.userId],
			references: [user.id],
		}),
	}),
);

export const rolesRelations = relations(roles, ({ many }) => ({
	organizationUsers: many(organizationUsers),
}));

export const userRelations = relations(user, ({ many }) => ({
	organizationUsers: many(organizationUsers),
}));
