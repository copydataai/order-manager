import { relations } from "drizzle-orm/relations";
import { order, orderdetails, product, organization, organization_users, roles, user } from "./schema";

export const orderdetailsRelations = relations(orderdetails, ({one}) => ({
	order: one(order, {
		fields: [orderdetails.order_id],
		references: [order.order_id]
	}),
	product: one(product, {
		fields: [orderdetails.product_id],
		references: [product.product_id]
	}),
}));

export const orderRelations = relations(order, ({one, many}) => ({
	orderdetails: many(orderdetails),
	organization: one(organization, {
		fields: [order.organization_id],
		references: [organization.organization_id]
	}),
}));

export const productRelations = relations(product, ({one, many}) => ({
	orderdetails: many(orderdetails),
	organization: one(organization, {
		fields: [product.organization_id],
		references: [organization.organization_id]
	}),
}));

export const organizationRelations = relations(organization, ({many}) => ({
	orders: many(order),
	products: many(product),
	organization_users: many(organization_users),
}));

export const organization_usersRelations = relations(organization_users, ({one}) => ({
	organization: one(organization, {
		fields: [organization_users.organization_id],
		references: [organization.organization_id]
	}),
	role: one(roles, {
		fields: [organization_users.role_id],
		references: [roles.role_id]
	}),
	user: one(user, {
		fields: [organization_users.user_id],
		references: [user.id]
	}),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	organization_users: many(organization_users),
}));

export const userRelations = relations(user, ({many}) => ({
	organization_users: many(organization_users),
}));