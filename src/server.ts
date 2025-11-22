import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema';

const client = createClient({ url: process.env.BD_URL! });
const db = drizzle(client);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    id: crypto.randomUUID(),
    name: 'John',
    email: 'john@example.com',
    password: 'securepassword',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)

  await db
    .update(usersTable)
    .set({
      password: 'newsecurepassword',
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!')

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log('User deleted!')
}

main();