"use server";

import { db, schema } from "@order/db";

export async function addEmailToWaitlist(email: string) {
  await db.insert(schema.waitlist).values({ email });
}
