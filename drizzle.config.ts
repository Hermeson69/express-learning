import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.BD_URL ?? process.env.DB_URL;

if (!dbUrl) {
  throw new Error(
    "Database URL is not set. Define BD_URL (preferred) or DB_URL."
  );
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: dbUrl,
  },
});
