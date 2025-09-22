import { pgEnum, pgSchema, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

// NOTE: FK 생성을 위한 더미 테이블. export 금지
const users = pgSchema("auth").table("users", {
  id: uuid().primaryKey(),
});

export const roles = pgEnum("role", ["admin", "user"]);

export const profiles = pgTable("profiles", {
  profile_id: uuid()
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  role: roles().notNull().default("user"),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
