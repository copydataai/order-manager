import type { TRPCRouterRecord } from "@trpc/server";
import { schema, schemaZod } from "@order/db";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../trpc";

export const productRouter = {
    getProductById: publicProcedure
        .input(z.object({ productId: z.number() }))
        .query(async ({ input, ctx }) => {
            const product = await ctx.db
                .select()
                .from(schema.product)
                .where(eq(schema.product.productId, input.productId))
                .limit(1);

            return product[0]!;
        }),

    create: protectedProcedure
        .input(schemaZod.createProductSchema)
        .mutation(async ({ input, ctx }) => {
            const formattedInput = {
                ...input,
                price: input.price.toString(),
            };
            const data = await ctx.db
                .insert(schema.product)
                .values(formattedInput);
        }),
    listAllByUserId: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.user.id;
        const organizations = await ctx.db
            .select({
                organizationId: schema.organizationUsers.organizationId,
            })
            .from(schema.organizationUsers)
            .where(eq(schema.organizationUsers.userId, userId));

        // because inArray doesn't accept empty arrays
        if (organizations.length === 0) return [];

        const organizationsIds = organizations.map((o) => o.organizationId);

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
    listAllByOrganizationID: protectedProcedure
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
    listAllByOrganizationName: protectedProcedure
        .input(z.object({ name: z.string() }))
        .query(async ({ input, ctx }) => {
            const { name } = input;

            const organization = await ctx.db
                .select()
                .from(schema.organization)
                .where(eq(schema.organization.name, name));

            const { organizationId } = organization[0]!;

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
