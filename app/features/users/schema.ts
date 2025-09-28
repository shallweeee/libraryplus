import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgPolicy,
  pgSchema,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { authUid, authenticatedRole } from "drizzle-orm/supabase";

import { libraries } from "../libraries/schema";

// NOTE: FK 생성을 위한 더미 테이블. export 금지
const users = pgSchema("auth").table("users", {
  id: uuid().primaryKey(),
});

export const roles = pgEnum("role", ["admin", "user"]);

export const profiles = pgTable(
  "profiles",
  {
    profile_id: uuid()
      .primaryKey()
      .references(() => users.id, { onDelete: "cascade" }),
    role: roles().notNull().default("user"),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("Can read own rows", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`${authUid} = ${table.profile_id}`,
    }),
  ]
);

export const profilesLibraries = pgTable(
  "profiles_libraries",
  {
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }),
    lib_code: text().references(() => libraries.lib_code, { onDelete: "cascade" }),
    dtl_region: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.profile_id, table.lib_code] }),
    pgPolicy("Can write own rows", {
      for: "insert",
      to: authenticatedRole,
      as: "permissive",
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy("Can read own rows", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy("Can delete own rows", {
      for: "delete",
      to: authenticatedRole,
      as: "permissive",
      using: sql`${authUid} = ${table.profile_id}`,
    }),
  ]
);
