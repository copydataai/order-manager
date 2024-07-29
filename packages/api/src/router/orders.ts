import type { TRPCRouterRecord } from "@trpc/server";
import { Order, OrderDetails, Organization, Product } from "@order/db/schema";
import { OrderCreate, OrderCreateSchema } from "@order/validators";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../trpc";

// TODO: Fix the types
type Order = typeof Order.$inferSelect;
type OrderDetail = typeof OrderDetails.$inferSelect;
type Product = typeof Product.$inferSelect;
type Organization = typeof Organization.$inferSelect;

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
                .insert(Order)
                .values(formattedInput)
                .returning();

            const orderId = order[0]!.orderId;

            const details = orderDetails.map((detail) => ({
                ...detail,
                orderId,
                lineTotal: detail.lineTotal.toString(), // Convert lineTotal to string
            }));

            await ctx.db.insert(OrderDetails).values(details);
            return "thank you";
        }),

    listAllByOrganizationId: publicProcedure //
        .input(z.object({ organizationId: z.number() }))
        .query(async ({ input, ctx }) => {
            const { organizationId } = input;

            const orders = await ctx.db
                .select()
                .from(Order)
                .where(eq(Order.organizationId, organizationId));

            return orders;
        }),
    // INFO: This list all the orders, orderdetails and product by organizationId
    listAllOrdersDetailsProductsbyOrganizationId: publicProcedure
        .input(z.object({ organizationId: z.number() }))
        .query(async ({ input, ctx }) => {
            const ordersDetailsProducts = await ctx.db
                .select()
                .from(Order)
                .where(eq(Order.organizationId, input.organizationId))
                .innerJoin(
                    OrderDetails,
                    eq(Order.orderId, OrderDetails.orderId),
                )
                .innerJoin(
                    Product,
                    eq(Product.productId, OrderDetails.productId),
                );

            const result = ordersDetailsProducts.reduce<
                Record<
                    number,
                    {
                        order: Order;
                        orderdetails: {
                            orderdetail: OrderDetail;
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
            .from(Order)
            .innerJoin(
                Organization,
                eq(Order.organizationId, Organization.organizationId),
            )
            .innerJoin(OrderDetails, eq(Order.orderId, OrderDetails.orderId))
            .innerJoin(Product, eq(Product.productId, OrderDetails.productId));

        const result = orders.reduce<
            Record<
                number,
                {
                    organization: Organization;
                    order: Order;
                    orderdetails: {
                        orderdetail: OrderDetail;
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
                .from(OrderDetails)
                .where(eq(OrderDetails.orderId, input.orderId));

            return orders;
        }),
    listDetailsAndProductByOrderId: protectedProcedure
        // INFO: make a query for orders and also retrieve product
        .input(z.object({ orderId: z.number() }))
        .query(async ({ input, ctx }) => {
            const orders = await ctx.db
                .select()
                .from(OrderDetails)
                .where(eq(OrderDetails.orderId, input.orderId))
                .innerJoin(
                    Product,
                    eq(OrderDetails.productId, Product.productId),
                );

            console.log("orders", orders);
            return orders;
        }),
};
