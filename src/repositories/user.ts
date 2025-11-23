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
      createdAt: model.createdAt || new Date().toISOString(),
      updatedAt: model.updatedAt || new Date().toISOString(),
    };

    await this.db.insert(usersTable).values(user);

    return new UserModel(
      user.id,
      user.name,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt
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
      user.createdAt,
      user.updatedAt
    );
  }

  async getUserById(id: string): Promise<UserModel | null> {
    const user = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .get();

    if (!user) {
      return null;
    }

    return new UserModel(
      user.id,
      user.name,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt
    );
  }

  async getAllUsers(): Promise<UserModel[]> {
    const users = await this.db.select().from(usersTable).all();

    return users.map(
      (user) =>
        new UserModel(
          user.id,
          user.name,
          user.email,
          user.password,
          user.createdAt,
          user.updatedAt
        )
    );
  }

  async update(id: string, model: Partial<UserModel>): Promise<UserModel> {
    const updateData: Partial<typeof usersTable.$inferInsert> = {};

    if (model.name !== undefined) updateData.name = model.name;
    if (model.email !== undefined) updateData.email = model.email;
    if (model.password !== undefined) updateData.password = model.password;
    updateData.updatedAt = new Date().toISOString();

    await this.db
      .update(usersTable)
      .set(updateData)
      .where(eq(usersTable.id, id));

    const updatedUser = await this.getUserById(id);
    if (!updatedUser) {
      throw new Error("User not found after update");
    }

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(usersTable).where(eq(usersTable.id, id));
  }
}
