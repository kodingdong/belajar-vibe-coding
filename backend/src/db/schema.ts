import { mysqlTable, varchar, int, timestamp, text } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp().onUpdateNow().default(sql`CURRENT_TIMESTAMP`),
});

export const posts = mysqlTable("posts", {
  id: int().primaryKey().autoincrement(),
  userId: int().notNull(),
  title: varchar({ length: 255 }).notNull(),
  content: text(),
  createdAt: timestamp().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp().onUpdateNow().default(sql`CURRENT_TIMESTAMP`),
});
