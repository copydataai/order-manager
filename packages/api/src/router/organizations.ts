import type { TRPCRouterRecord } from "@trpc/server";
import { schema } from "@order/db";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../trpc";

export const organizationRouter = {
    // TODO: change public procedure to protected exept read by id or by name
    //
    //

    createRole: protectedProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { name } = input;
            const data = await ctx.db
                .insert(schema.roles)
                .values({ name })
                .returning();
            return data;
        }),

    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                location: z.string(),
                contactInfo: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { name, location, contactInfo } = input;
            const { user } = ctx;
            if (!user) {
                console.log("no auth");
            }
            console.log(input);
            const data = await ctx.db.insert(schema.organization).values({
                name,
                location,
                contactInfo,
            });
            return data;
        }),
    listByName: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(({ input, ctx }) => {
            const { name } = input;
            return ctx.db.select().from(schema.organization).where({ name });
        }),
    listAll: protectedProcedure.query(({ ctx }) => {
        console.log(ctx.user.id);
        return ctx.db
            .select(schema.organization)
            .from(schema.organizationUsers)
            .innerJoin(
                schema.organization,
                eq(
                    schema.organization.organizationId,
                    schema.organizationUsers.organizationId,
                ),
            );
    }),
    getByName: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(async ({ input, ctx }) => {
            const { name } = input;
            const data = await ctx.db
                .select()
                .from(schema.organization)
                .where(eq(schema.organization.name, name));

            return data[0];
        }),
};
