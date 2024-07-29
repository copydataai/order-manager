import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { Order, OrderDetails, Organization, Product } from "./schema";

export enum status {
    FINISHED = "FINISHED",
    CANCELLED = "CANCELLED",
    ORDERED = "ORDERED",
}

export const statusOrderSchema = z.nativeEnum(status);

export const organizationSchema = createSelectSchema(Organization);

export const createOrderSchema = createInsertSchema(Order, {
    orderDate: z.date(),
    customerName: z.string(),
    status: statusOrderSchema,
    totalAmount: z.number(),
    organizationId: z.number(),
}).omit({
    orderId: true,
    //TODO: add created_at, updated_at
});

export const createOrderDetailSchema = createInsertSchema(OrderDetails, {
    orderId: z.number(),
    productId: z.number(),
    quantity: z.number(),
    lineTotal: z.number(),
}).omit({
    orderDetailId: true,
    //TODO: add created_at, updated_at
});
export const createOrderDetailsSchema = createInsertSchema(OrderDetails, {
    productId: z.number(),
    quantity: z.number(),
    lineTotal: z.number(),
}).omit({
    orderDetailId: true,
    orderId: true,
    //TODO: add created_at, updated_at
});

export const createProductSchema = createInsertSchema(Product, {
    name: z.string(),
    description: z.string(),
    price: z.number().or(z.string()).pipe(z.coerce.number()),
    organizationId: z.number().or(z.string()).pipe(z.coerce.number()),
}).omit({
    productId: true,
    //TODO: add created_at, updated_at
});
