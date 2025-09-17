import { sql } from "drizzle-orm";
import { bigint, jsonb, pgPolicy, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const config = pgTable(
  "config",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    name: text().unique().notNull(),
    config: jsonb().notNull(),
    description: text(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  () => [
    pgPolicy("Users cannot access to config", {
      for: "all",
      to: "public",
      as: "permissive",
      using: sql`false`,
    }),
  ]
);
