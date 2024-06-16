"use server";

import { redirect, usePathname } from "next/navigation";

export async function redirectAuth() {
    redirect("/auth");
}

export async function redirectHome() {
    redirect("/");
}
