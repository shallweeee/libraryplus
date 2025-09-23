import { sql } from "drizzle-orm";
import { pgPolicy, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";

export const libraries = pgTable(
  "libraries",
  {
    lib_code: text().primaryKey(),
    lib_name: text().notNull(),
    address: text(),
    tel: text(),
    fax: text(),
    latitude: text(),
    longitude: text(),
    homepage: text(),
    closed: text(),
    operating_time: text(),
    book_count: text().notNull(),
    dtl_region: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  () => [
    pgPolicy("Enable read access for authenticated users", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);

export const dtlRegions = pgTable(
  "dtl_regions",
  {
    code: text().primaryKey(),
    region: text().notNull(),
    detail: text().notNull(),
  },
  () => [
    pgPolicy("Enable read access for authenticated users", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);
