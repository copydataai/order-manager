import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { order, orderdetails, organization, product } from "./schema";

export const statusOrderSchema = z.enum(["FINISHED", "CANCELLED", "ORDERED"]);

export const organizationSchema = createSelectSchema(organization);

export const createOrderSchema = createInsertSchema(order, {
    orderDate: z.date(),
    customerName: z.string(),
    status: statusOrderSchema,
    totalAmount: z.number(),
    organizationId: z.number(),
}).omit({
    orderId: true,
    //TODO: add created_at, updated_at
});

export const createOrderDetailSchema = createInsertSchema(orderdetails, {
    orderId: z.number(),
    productId: z.number(),
    quantity: z.number(),
    lineTotal: z.number(),
}).omit({
    orderDetailId: true,
    //TODO: add created_at, updated_at
});
export const createOrderDetailsSchema = createInsertSchema(orderdetails, {
    productId: z.number(),
    quantity: z.number(),
    lineTotal: z.number(),
}).omit({
    orderDetailId: true,
    orderId: true,
    //TODO: add created_at, updated_at
});

export const createProductSchema = createInsertSchema(product, {
    name: z.string(),
    description: z.string(),
    price: z.number().or(z.string()).pipe(z.coerce.number()),
    organizationId: z.number().or(z.string()).pipe(z.coerce.number()),
}).omit({
    productId: true,
    //TODO: add created_at, updated_at
});
