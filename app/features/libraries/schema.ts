import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const libraries = pgTable("libraries", {
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
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
