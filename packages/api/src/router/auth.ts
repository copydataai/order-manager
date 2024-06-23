import type { TRPCRouterRecord } from "@trpc/server";
import { AuthClient } from "@supabase/auth-js";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../trpc";

// Define AuthContext interface with signUp and signInWithPassword methods
interface AuthContext {
    signUp: (params: {
        email: string;
        password: string;
        options?: { data: { first_name: string; last_name: string } };
    }) => Promise<{ data: any; error: any }>;
    signInWithPassword: (params: {
        email: string;
        password: string;
    }) => Promise<{ data: any; error: any }>;
}

export const authRouter = {
    signup: publicProcedure
        .input(
            z.object({
                email: z.string(),
                password: z.string(),
                firstName: z.string(),
                lastName: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            // Check if ctx.auth is defined and implements AuthContext
            if (!ctx.auth) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Authentication context is not available",
                });
            }
            console.log("type", typeof ctx.auth.auth);
            console.log("type 2", typeof ctx.user);

            const auth = ctx.auth.auth as AuthContext;
            console.log("auth", auth);

            const { data, error } = await auth.signUp({
                email: input.email,
                password: input.password,
                options: {
                    data: {
                        first_name: input.firstName,
                        last_name: input.lastName,
                    },
                },
            });
            if (error) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: error.message,
                });
            }

            ctx.user = data.user;
            ctx.auth = data.session;

            return data;
        }),
    login: publicProcedure
        .input(z.object({ email: z.string(), password: z.string() }))
        .mutation(async ({ ctx, input }) => {
            // Check if ctx.auth is defined and implements AuthContext
            if (!ctx.auth) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Authentication context is not available",
                });
            }
            console.log("type", ctx.auth);
            console.log("type 2", ctx.user);

            const auth = ctx.auth.auth as AuthContext;
            console.log("auth", auth);
            const { data, error } = await auth.signInWithPassword({
                email: input.email,
                password: input.password,
            });

            if (error) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: error.message,
                });
            }

            ctx.user = data.user;
            ctx.auth = data.session;

            return data;
        }),
} satisfies TRPCRouterRecord;
