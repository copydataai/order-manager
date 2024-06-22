import type { TRPCRouterRecord } from "@trpc/server";
import { schema } from "@order/db";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../trpc";

export const productRouter = {
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
                price: z.number().or(z.string()).pipe(z.coerce.number()),
                organizationId: z
                    .number()
                    .or(z.string())
                    .pipe(z.coerce.number()),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { name, description, price, organizationId } = input;
            const data = await ctx.db.insert(schema.product).values({
                name,
                description,
                price,
                organizationId,
            });
        }),
    listAllByUserId: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.user.id;
        const organizations = await ctx.db
            .select({
                organizationId: schema.organizationUsers.organizationId,
            })
            .from(schema.organizationUsers)
            .where(eq(schema.organizationUsers.userId, userId));

        console.log(organizations);
        const organizationsIds = organizations.map((o) => o.organizationId);
        console.log(organizationsIds);

        const products = await ctx.db
            .select()
            .from(schema.product)
            .where(inArray(schema.product.organizationId, organizationsIds));

        return products;
    }),
    // TODO: make query case no sesitive for products by name in a specific organization
    // listByNameAndOrganizationId: publicProcedure
    //     .input(z.object({ name: z.string(), organizationId: z.number() }))
    //     .query(async ({ input, ctx }) => {
    //         const { name, organizationId } = input;
    //         // TODO: add "like" for uncase sensitive queries
    //         const data = await ctx.db.select().from(schema.product).where({
    //             name,
    //             organizationId,
    //         });
    //         return data;
    //     }),
    listAllByOrganizationID: publicProcedure
        .input(z.object({ organizationId: z.number() }))
        .query(async ({ input, ctx }) => {
            const { organizationId } = input;
            const data = await ctx.db
                .select()
                .from(schema.product)
                .where(eq(schema.product.organizationId, organizationId));

            return data;
        }),

    // TODO: make query case no sesitive for products by name in a specific organization
    listAllByOrganizationName: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(async ({ input, ctx }) => {
            const { name } = input;

            const organization = await ctx.db
                .select()
                .from(schema.organization)
                .where(eq(schema.organization.name, name));

            const { organizationId } = organization[0];

            const data = await ctx.db
                .select()
                .from(schema.product)
                .where(eq(schema.product.organizationId, organizationId));

            return data;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input, ctx }) => {
            const { id } = input;
            const data = await ctx.db
                .delete(schema.product)
                .where(eq(schema.product.productId, id));

            return data;
        }),
};
