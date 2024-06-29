import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { connectionStr } from "./config";
import * as relations from "./schema/relations";
import * as schemas from "./schema/schema";
import * as schemasZod from "./schema/schemasZod";

export * from "drizzle-orm/sql";

export { drizzle } from "drizzle-orm/postgres-js";

export const schema = { ...schemas, ...relations };

export const schemaZod = {
    ...schemasZod,
};

const psClient = postgres(connectionStr.href, { prepare: false });
export const db = drizzle(psClient, { schema });
