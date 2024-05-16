import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { CreateServerClient } from "../supabase";
import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
    signup: publicProcedure
        .input(z.object({ email: z.string(), password: z.string() }))
        .mutation(({ ctx, input }) => {
            const supabase = CreateServerClient();

            const res = supabase.auth.signUp({
                email: input.email,
                password: input.password,
            });

            return res;
        }),
    login: publicProcedure
        .input(z.object({ email: z.string(), password: z.string() }))
        .mutation(({ ctx, input }) => {
            const supabase = CreateServerClient();
            const res = supabase.auth.signInWithPassword({
                email: input.email,
                password: input.password,
            });

            return res;
        }),
} satisfies TRPCRouterRecord;
