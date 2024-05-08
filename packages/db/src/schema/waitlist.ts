import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    created_at: timestamp("created_at", { mode: "date" })
        .defaultNow()
        .notNull(),
});
