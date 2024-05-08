import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { connectionStr } from "./config";
import * as schemas from "./schema/schema";
import * as waitlist from "./schema/waitlist";

export * from "drizzle-orm/sql";

export { drizzle } from "drizzle-orm/postgres-js";

export const schema = { ...waitlist, ...schemas };

const psClient = postgres(connectionStr.href, { prepare: false });
export const db = drizzle(psClient, { schema });
