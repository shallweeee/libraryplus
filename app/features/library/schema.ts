import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  jsonb,
  pgEnum,
  pgPolicy,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { authUid, authenticatedRole } from "drizzle-orm/supabase";

export const parsingRules = pgTable(
  "parsing_rules",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    alliance: text(),
    rules: jsonb(),
  },
  () => [
    pgPolicy("Users can view parsing_rules", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);

export const libraries = pgTable(
  "libraries",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    url: text().notNull(),
    is_digital: boolean().notNull().default(false),
    country: text(),
    city: text(),
    parsing_rule_id: bigint({ mode: "number" }).references(() => parsingRules.id),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  () => [
    pgPolicy("Users can view parsing_rules", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);

const users = pgSchema("auth").table("users", {
  id: uuid().primaryKey(),
});

export const roles = pgEnum("role", ["user", "admin"]);

export const profiles = pgTable(
  "profiles",
  {
    id: uuid()
      .primaryKey()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text().notNull(),
    role: roles().notNull().default("user"),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("Users can view own users_libraries", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`${authUid} = ${table.id}`,
    }),
    pgPolicy("Users can update own users_libraries", {
      for: "update",
      to: authenticatedRole,
      as: "permissive",
      using: sql`${authUid} = ${table.id}`,
      withCheck: sql`${authUid} = ${table.id}`,
    }),
  ]
);

export const usersLibraries = pgTable(
  "users_libraries",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    user_id: uuid().references(() => profiles.id, { onDelete: "cascade" }),
    library_id: bigint({ mode: "number" }).references(() => libraries.id, { onDelete: "cascade" }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("Users can insert own users_libraries", {
      for: "insert",
      to: authenticatedRole,
      as: "permissive",
      withCheck: sql`${authUid} = ${table.user_id}`,
    }),
    pgPolicy("Users can view own users_libraries", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`${authUid} = ${table.user_id}`,
    }),
    pgPolicy("Users can update own users_libraries", {
      for: "update",
      to: authenticatedRole,
      as: "permissive",
      using: sql`${authUid} = ${table.user_id}`,
      withCheck: sql`${authUid} = ${table.user_id}`,
    }),
    pgPolicy("Users can delete own users_libraries", {
      for: "delete",
      to: authenticatedRole,
      as: "permissive",
      using: sql`${authUid} = ${table.user_id}`,
    }),
  ]
);

export const requestStatus = pgEnum("request_status", [
  "requested",
  "processing",
  "processed",
  "rejected",
]);

export const libraryRequests = pgTable(
  "library_requests",
  {
    request_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    url: text().notNull(),
    user_id: uuid().references(() => profiles.id, { onDelete: "cascade" }),
    status: requestStatus().notNull().default("requested"),
    note: text(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("Users can create own requests", {
      for: "insert",
      to: authenticatedRole,
      as: "permissive",
      withCheck: sql`${authUid} = ${table.user_id}`,
    }),
    pgPolicy("Users can view all requests", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
    pgPolicy("Users can update own requests", {
      for: "update",
      to: authenticatedRole,
      as: "permissive",
      withCheck: sql`${authUid} = ${table.user_id}`,
    }),
  ]
);
