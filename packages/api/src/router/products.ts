import type { TRPCRouterRecord } from "@trpc/server";
import {
    createProductSchema,
    Organization,
    OrganizationUsers,
    Product,
} from "@order/db/schema";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../trpc";

export const productRouter = {
    getProductById: publicProcedure
        .input(z.object({ productId: z.number() }))
        .query(async ({ input, ctx }) => {
            const product = await ctx.db
                .select()
                .from(Product)
                .where(eq(Product.productId, input.productId))
                .limit(1);

            return product[0]!;
        }),

    create: protectedProcedure
        .input(createProductSchema)
        .mutation(async ({ input, ctx }) => {
            const formattedInput = {
                ...input,
                price: input.price.toString(),
            };
            const data = await ctx.db.insert(Product).values(formattedInput);
        }),
    listAllByUserId: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.user.id;
        const organizations = await ctx.db
            .select({
                organizationId: OrganizationUsers.organizationId,
            })
            .from(OrganizationUsers)
            .where(eq(OrganizationUsers.userId, userId));

        // because inArray doesn't accept empty arrays
        if (organizations.length === 0) return [];

        const organizationsIds = organizations.map((o) => o.organizationId);

        const products = await ctx.db
            .select()
            .from(Product)
            .where(inArray(Product.organizationId, organizationsIds));

        return products;
    }),
    listAllByOrganizationID: protectedProcedure
        .input(z.object({ organizationId: z.number() }))
        .query(async ({ input, ctx }) => {
            const { organizationId } = input;
            const data = await ctx.db
                .select()
                .from(Product)
                .where(eq(Product.organizationId, organizationId));

            return data;
        }),

    // TODO: make query case no sesitive for products by name in a specific organization
    listAllByOrganizationName: protectedProcedure
        .input(z.object({ name: z.string() }))
        .query(async ({ input, ctx }) => {
            const { name } = input;

            const organization = await ctx.db
                .select()
                .from(Organization)
                .where(eq(Organization.name, name));

            const { organizationId } = organization[0]!;

            const data = await ctx.db
                .select()
                .from(Product)
                .where(eq(Product.organizationId, organizationId));

            return data;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input, ctx }) => {
            const { id } = input;
            const data = await ctx.db
                .delete(Product)
                .where(eq(Product.productId, id));

            return data;
        }),
};
