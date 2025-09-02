import {
  bigint,
  boolean,
  jsonb,
  pgEnum,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const parsingRules = pgTable("parsing_rules", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  alliance: text(),
  rules: jsonb(),
});

export const libraries = pgTable("libraries", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  url: text().notNull(),
  is_digital: boolean().notNull().default(false),
  country: text(),
  city: text(),
  parsing_rule_id: bigint({ mode: "number" }).references(() => parsingRules.id),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

const users = pgSchema("auth").table("users", {
  id: uuid().primaryKey(),
});

export const roles = pgEnum("role", ["user", "admin"]);

export const profiles = pgTable("profiles", {
  id: uuid()
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text().notNull(),
  role: roles().notNull().default("user"),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const usersLibraries = pgTable("users_libraries", {
  user_id: uuid().references(() => profiles.id, { onDelete: "cascade" }),
  library_id: bigint({ mode: "number" }).references(() => libraries.id, { onDelete: "cascade" }),
  created_at: timestamp().notNull().defaultNow(),
});

export const requestStatus = pgEnum("request_status", [
  "requested",
  "processing",
  "processed",
  "rejected",
]);

export const libraryRequests = pgTable("library_requests", {
  request_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  url: text().notNull(),
  user_id: uuid().references(() => profiles.id, { onDelete: "cascade" }),
  status: requestStatus().notNull().default("requested"),
  note: text(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
