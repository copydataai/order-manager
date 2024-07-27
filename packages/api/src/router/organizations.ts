import type { TRPCRouterRecord } from "@trpc/server";
import { schema } from "@order/db";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../trpc";

export const organizationRouter = {
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

    listRoles: protectedProcedure.query(({ ctx }) => {
        return ctx.db.select().from(schema.roles);
    }),

    listUserAndRolesByOrganizationId: protectedProcedure
        .input(z.object({ organizationId: z.number() }))
        .query(async ({ input, ctx }) => {
            const { organizationId } = input;
            const usersRoles = await ctx.db
                .select({
                    roleId: schema.roles.roleId,
                    roleName: schema.roles.name,
                    userId: schema.user.id,
                    userFirstName: schema.user.firstName,
                    userLastName: schema.user.lastName,
                })
                .from(schema.organizationUsers)
                .where(
                    eq(schema.organizationUsers.organizationId, organizationId),
                )
                .innerJoin(
                    schema.roles,
                    eq(schema.roles.roleId, schema.organizationUsers.roleId),
                )
                .innerJoin(
                    schema.user,
                    eq(schema.user.id, schema.organizationUsers.userId),
                );

            // return {users, roles};
            return usersRoles;
        }),

    create: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                location: z.string(),
                contactInfo: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { name, location, contactInfo } = input;
            const data = await ctx.db.insert(schema.organization).values({
                name,
                location,
                contactInfo,
            });
            return data;
        }),
    createAndAdminUserByDefault: protectedProcedure
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

            const organization = await ctx.db
                .insert(schema.organization)
                .values({
                    name,
                    location,
                    contactInfo,
                })
                .returning();

            const adminRole = await ctx.db
                .select()
                .from(schema.roles)
                .where(eq(schema.roles.name, "admin"));

            const organizationUsers = await ctx.db
                .insert(schema.organizationUsers)
                .values({
                    organizationId: organization[0]!.organizationId,
                    roleId: adminRole[0]!.roleId,
                    userId: user.id,
                });

            return organization[0];
        }),
    listAll: protectedProcedure.query(({ ctx }) => {
        const userId = ctx.user.id;
        return ctx.db
            .select({
                organizationId: schema.organization.organizationId,
                organizationName: schema.organization.name,
                organizationLocation: schema.organization.location,
                organizationContactInfo: schema.organization.contactInfo,
            })
            .from(schema.organizationUsers)
            .where(eq(schema.organizationUsers.userId, userId))
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
