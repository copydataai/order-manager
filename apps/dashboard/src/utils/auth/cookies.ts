"use server";

import type { AuthSession } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function getAuthSession(): AuthSession | undefined {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    // TODO: add auth refreshSession

    return session;
}

export async function setAuthSession(session: AuthSession) {
    const cookieStore = cookies();
    const text = session.access_token;

    cookieStore.set("session", text, {
        httpOnly: true,
        expires: new Date(session.expires_at * 1000),
        path: "/",
        sameSite: "strict",
        secure: true,
    });
}
