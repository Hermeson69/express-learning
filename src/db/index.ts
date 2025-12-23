import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

// Prefer BD_URL (used by drizzle.config) and fallback to DB_URL for backward compatibility
const dbUrl = process.env.BD_URL || process.env.DB_URL;
if (!dbUrl) {
  throw new Error("Database URL is not set. Define BD_URL (preferred) or DB_URL.");
}

const client = createClient({
  url: dbUrl,
});

export const db = drizzle(client, { schema });

export type { schema };