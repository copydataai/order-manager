import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
    signup: publicProcedure
        .input(z.object({ email: z.string(), password: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const res = await ctx.auth.signUp({
                email: input.email,
                password: input.password,
            });

            return res;
        }),
    login: publicProcedure
        .input(z.object({ email: z.string(), password: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await ctx.auth.signInWithPassword({
                email: input.email,
                password: input.password,
            });
            // ctx.session = data.session;
            ctx.user = data.user;
            ctx.auth = data.session;

            return data;
        }),
} satisfies TRPCRouterRecord;
