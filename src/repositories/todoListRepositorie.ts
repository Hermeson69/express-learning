import { drizzle } from "drizzle-orm/libsql";
import { TodoListModel } from "../models";
import { eq } from "drizzle-orm";
import { todoListsTable } from "../db/schema";

export default class TodoListRepository {
  db: ReturnType<typeof drizzle>;

  constructor(db: ReturnType<typeof drizzle>) {
    this.db = db;
  }

  async create(model: TodoListModel): Promise<TodoListModel> {
    const todoList: typeof todoListsTable.$inferInsert = {
      id: model.id,
      title: model.title,
      description: model.description,
      deliverySchedule: model.deliverySchedule,
      isCompleted: model.isCompleted,
      userId: model.userId,
      createdAt: model.createdAt || new Date().toISOString(),
      updatedAt: model.updatedAt || new Date().toISOString(),
    };

    await this.db.insert(todoListsTable).values(todoList);

    return new TodoListModel(
      todoList.id,
      todoList.title,
      todoList.description,
      todoList.deliverySchedule,
      todoList.isCompleted ?? false,
      todoList.userId,
      todoList.createdAt,
      todoList.updatedAt
    );
  }

  async getById(id: string): Promise<TodoListModel | null> {
    const todoList = await this.db
      .select()
      .from(todoListsTable)
      .where(eq(todoListsTable.id, id))
      .get();

    if (!todoList) {
      return null;
    }

    return new TodoListModel(
      todoList.id,
      todoList.title,
      todoList.description,
      todoList.deliverySchedule,
      todoList.isCompleted,
      todoList.userId,
      todoList.createdAt,
      todoList.updatedAt
    );
  }

  async getAllByUserId(userId: string): Promise<TodoListModel[]> {
    const todoLists = await this.db
      .select()
      .from(todoListsTable)
      .where(eq(todoListsTable.userId, userId))
      .all();

    return todoLists.map(
      (todoList) =>
        new TodoListModel(
          todoList.id,
          todoList.title,
          todoList.description,
          todoList.deliverySchedule,
          todoList.isCompleted,
          todoList.userId,
          todoList.createdAt,
          todoList.updatedAt
        )
    );
  }

  async getAllTasksfromSchedule(deliverySchedule: string): Promise<TodoListModel[]> {
    const todoLists = await this.db
      .select()
      .from(todoListsTable)
      .where(eq(todoListsTable.deliverySchedule, deliverySchedule))
      .all();

    return todoLists.map(
      (todoList) =>
        new TodoListModel(
          todoList.id,
          todoList.title,
          todoList.description,
          todoList.deliverySchedule,
          todoList.isCompleted,
          todoList.userId,
          todoList.createdAt,
          todoList.updatedAt
        )
    );
  }

  async update(model: TodoListModel): Promise<void> {
    await this.db
      .update(todoListsTable)
      .set({
        title: model.title,
        description: model.description,
        deliverySchedule: model.deliverySchedule,
        isCompleted: model.isCompleted,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(todoListsTable.id, model.id));
  }

  async delete(id: string): Promise<void> {
    await this.db
      .delete(todoListsTable)
      .where(eq(todoListsTable.id, id));
  }
}
