import type { TRPCRouterRecord } from "@trpc/server";
import { schema } from "@order/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { publicProcedure } from "../trpc";

export const orderRouter = {
    create: publicProcedure
        .input(
            z.object({
                orderDate: z.date(),
                customerName: z.string(),
                // TODO add enum statusorder by db.schema
                status: z.string(),
                totalAmount: z.number(),
                organizationId: z.number(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            console.log(input);
            const {
                customerName,
                orderDate,
                organizationId,
                status,
                totalAmount,
            } = input;
            const data = await ctx.db.insert(schema.order).values({
                customerName,
                orderDate: orderDate.toISOString(),
                status,
                totalAmount,
                organizationId,
            });
            console.log(data);

            return data;
        }),

    createOrderDetail: publicProcedure
        .input(
            z.object({
                productId: z.number(),
                orderId: z.number(),
                quantity: z.number(),
                status: z.string(),
                lineTotal: z.number(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { productId, orderId, status, quantity, lineTotal } = input;

            const data = await ctx.db.insert(schema.orderdetails).values({
                productId,
                orderId,
                status,
                quantity,
                lineTotal,
            });

            return data;
        }),

    createOrderAndOrderDetails: publicProcedure
        .input(
            z.object({
                productId: z.number(),
                orderId: z.number(),
                quantity: z.number(),
                lineTotal: z.number(),
                orderDetails: z.array(
                    z.object({
                        orderDate: z.date(),
                        customerName: z.string(),
                        // TODO add enum statusorder by db.schema
                        status: z.string(),
                        totalAmount: z.number(),
                        organizationId: z.number(),
                    }),
                ),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            console.log(input);
            return "thank you";
        }),

    listDetailsByOrderId: publicProcedure
        .input(z.object({ orderId: z.number() }))
        .query(async ({ input, ctx }) => {
            const { orderId } = input;
            console.log(orderId);
            const orderDetails = await ctx.db
                .select()
                .from(schema.orderdetails)
                .where(eq(schema.orderdetails.orderId, orderId));
            return orderDetails;
        }),
    listAllByOrganizationId: publicProcedure //
        .input(z.object({ organizationId: z.number() }))
        .query(async ({ input, ctx }) => {
            const { organizationId } = input;

            const orders = await ctx.db
                .select()
                .from(schema.order)
                .where(eq(schema.order.organizationId, organizationId));

            return orders;
        }),
    // TODO: add input by user and check which organization it belongs
    listAll: publicProcedure.query(async ({ ctx }) => {
        const orders = await ctx.db.select().from(schema.order);
        return orders;
    }),
};
