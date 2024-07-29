import type { Config } from "drizzle-kit";
import * as z from "zod";

import { env } from "./src/client";

const nonPoolingUrl = env.POSTGRES_URL.replace(":6543", ":5432");

connectionStr.username = env.DB_USERNAME;
connectionStr.password = env.DB_PASSWORD;

export default {
    schema: ["./src/schema/*"],
    dialect: "postgresql",
    dbCredentials: { url: connectionStr.href },
    out: "./drizzle",
    introspect: {
        casing: "camel",
    },
    verbose: true,
} satisfies Config;
