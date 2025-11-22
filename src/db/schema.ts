import { create } from "domain";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  password: text().notNull(),
  email: text().notNull().unique(),
  createdAt: text().notNull(),
  updatedAt: text().notNull(),
});
