import { drizzle } from "drizzle-orm/libsql";
import { UserModel } from "../models";
import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema";

export default class UserRepository {
  db: ReturnType<typeof drizzle>;

  constructor(db: ReturnType<typeof drizzle>) {
    this.db = db;
  }

  async create(model: UserModel): Promise<UserModel> {
     const user: typeof usersTable.$inferInsert = {
      id: model.id,
      name: model.name,
      email: model.email,
      password: model.password,
      createdAt: model.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: model.updatedAt?.toISOString() || new Date().toISOString(),
    };

    await this.db.insert(usersTable).values(user);

    return new UserModel(
      user.id,
      user.name,
      user.email,
      user.password,
      new Date(user.createdAt || new Date()),
      new Date(user.updatedAt || new Date())
    );
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .get();

    if (!user) {
      return null;
    }
    
    return new UserModel(
      user.id,
      user.name,
      user.email,
      user.password,
      new Date(user.createdAt),
      new Date(user.updatedAt)
    );
  }
}
