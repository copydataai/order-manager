import type { TRPCRouterRecord } from "@trpc/server";
import { schema, schemaZod } from "@order/db";
import { OrderCreateSchema } from "@order/validators";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../trpc";

// TODO: Fix the types
type Order = typeof schema.order.$inferSelect;
type Orderdetail = typeof schema.orderdetails.$inferSelect;
type Product = typeof schema.product.$inferSelect;
type Organization = typeof schema.organization.$inferSelect;

export const orderRouter = {
    createOrderAndOrderDetails: protectedProcedure
        .input(OrderCreateSchema)
        .mutation(async ({ input, ctx }) => {
            const {
                orderDate,
                customerName,
                status,
                totalAmount,
                organizationId,
                orderDetails,
            } = input;
            const formattedInput = {
                orderDate: orderDate.toISOString(), // Convert orderDate to string
                customerName,
                status,
                totalAmount: totalAmount.toString(), // Convert totalAmount to string
                organizationId,
            };

            const order = await ctx.db
                .insert(schema.order)
                .values(formattedInput)
                .returning();

            const orderId = order[0]!.orderId;

            const details = orderDetails.map((detail) => ({
                ...detail,
                orderId,
                lineTotal: detail.lineTotal.toString(), // Convert lineTotal to string
            }));

            await ctx.db.insert(schema.orderdetails).values(details);
            return "thank you";
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
    // INFO: This list all the orders, orderdetails and product by organizationId
    listAllOrdersDetailsProductsbyOrganizationId: publicProcedure
        .input(z.object({ organizationId: z.number() }))
        .query(async ({ input, ctx }) => {
            const ordersDetailsProducts = await ctx.db
                .select()
                .from(schema.order)
                .where(eq(schema.order.organizationId, input.organizationId))
                .innerJoin(
                    schema.orderdetails,
                    eq(schema.order.orderId, schema.orderdetails.orderId),
                )
                .innerJoin(
                    schema.product,
                    eq(schema.product.productId, schema.orderdetails.productId),
                );

            const result = ordersDetailsProducts.reduce<
                Record<
                    number,
                    {
                        order: Order;
                        orderdetails: {
                            orderdetail: Orderdetail;
                            product: Product;
                        }[];
                    }
                >
            >((acc, row) => {
                const order = row.order;
                const orderdetail = row.orderdetails;
                const product = row.product;
                if (!acc[order.orderId]) {
                    acc[order.orderId] = { order, orderdetails: [] };
                }
                if (orderdetail) {
                    acc[order.orderId]?.orderdetails.push({
                        orderdetail,
                        product,
                    });
                }
                return acc;
            }, {});

            return result;
        }),
    // TODO: add input by user and check which organization it belongs
    listAll: protectedProcedure.query(async ({ ctx }) => {
        const orders = await ctx.db
            .select()
            .from(schema.order)
            .innerJoin(
                schema.organization,
                eq(
                    schema.order.organizationId,
                    schema.organization.organizationId,
                ),
            )
            .innerJoin(
                schema.orderdetails,
                eq(schema.order.orderId, schema.orderdetails.orderId),
            )
            .innerJoin(
                schema.product,
                eq(schema.product.productId, schema.orderdetails.productId),
            );

        const result = orders.reduce<
            Record<
                number,
                {
                    organization: Organization;
                    order: Order;
                    orderdetails: {
                        orderdetail: Orderdetail;
                        product: Product;
                    }[];
                }
            >
        >((acc, row) => {
            const order = row.order;
            const organization = row.organization;
            const orderdetail = row.orderdetails;
            const product = row.product;
            if (!acc[order.orderId]) {
                acc[order.orderId] = { order, organization, orderdetails: [] };
            }
            if (orderdetail) {
                acc[order.orderId]?.orderdetails.push({
                    orderdetail,
                    product,
                });
            }
            return acc;
        }, {});

        return result;
    }),

    listDetailsByOrderId: protectedProcedure
        .input(z.object({ orderId: z.number() }))
        .query(async ({ input, ctx }) => {
            const orders = await ctx.db
                .select()
                .from(schema.orderdetails)
                .where(eq(schema.orderdetails.orderId, input.orderId));

            return orders;
        }),
    listDetailsAndProductByOrderId: protectedProcedure
        // INFO: make a query for orders and also retrieve product
        .input(z.object({ orderId: z.number() }))
        .query(async ({ input, ctx }) => {
            const orders = await ctx.db
                .select()
                .from(schema.orderdetails)
                .where(eq(schema.orderdetails.orderId, input.orderId))
                .innerJoin(
                    schema.product,
                    eq(schema.orderdetails.productId, schema.product.productId),
                );

            console.log("orders", orders);
            return orders;
        }),
};
