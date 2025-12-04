
import { is } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: text().primaryKey(),
  name: text().notNull(),
  password: text().notNull(),
  email: text().notNull().unique(),
  createdAt: text().notNull(),
  updatedAt: text().notNull(),
});

export const todoListsTable = sqliteTable("todo_lists_table", {
  id: text().primaryKey(),
  title: text().notNull(),
  description: text().notNull(),
  deliverySchedule: text().notNull(),
  isCompleted: text().notNull().default("false"),
  userId: text()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: text().notNull(),
  updatedAt: text().notNull(),
});
