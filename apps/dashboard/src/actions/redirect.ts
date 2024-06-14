"use server";

import { redirect } from "next/navigation";

export async function redirectAuth() {
    redirect("/auth");
}
