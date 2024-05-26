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
};
