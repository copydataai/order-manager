import type { TRPCRouterRecord } from "@trpc/server";
import { Organization, OrganizationUsers, Roles, User } from "@order/db/schema";
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
                .insert(Roles)
                .values({ name })
                .returning();
            return data;
        }),

    listRoles: protectedProcedure.query(({ ctx }) => {
        return ctx.db.select().from(Roles);
    }),

    listUserAndRolesByOrganizationId: protectedProcedure
        .input(z.object({ organizationId: z.number() }))
        .query(async ({ input, ctx }) => {
            const { organizationId } = input;
            const usersRoles = await ctx.db
                .select({
                    roleId: Roles.roleId,
                    roleName: Roles.name,
                    userId: User.id,
                    userFirstName: User.firstName,
                    userLastName: User.lastName,
                })
                .from(OrganizationUsers)
                .where(eq(OrganizationUsers.organizationId, organizationId))
                .innerJoin(Roles, eq(Roles.roleId, OrganizationUsers.roleId))
                .innerJoin(User, eq(User.id, OrganizationUsers.userId));

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
            const data = await ctx.db.insert(Organization).values({
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
                .insert(Organization)
                .values({
                    name,
                    location,
                    contactInfo,
                })
                .returning();

            const adminRole = await ctx.db
                .select()
                .from(Roles)
                .where(eq(Roles.name, "admin"));

            const organizationUsers = await ctx.db
                .insert(OrganizationUsers)
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
                organizationId: Organization.organizationId,
                organizationName: Organization.name,
                organizationLocation: Organization.location,
                organizationContactInfo: Organization.contactInfo,
            })
            .from(OrganizationUsers)
            .where(eq(OrganizationUsers.userId, userId))
            .innerJoin(
                Organization,
                eq(
                    Organization.organizationId,
                    OrganizationUsers.organizationId,
                ),
            );
    }),
    getByName: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(async ({ input, ctx }) => {
            const { name } = input;
            const data = await ctx.db
                .select()
                .from(Organization)
                .where(eq(Organization.name, name));

            return data[0];
        }),
};
