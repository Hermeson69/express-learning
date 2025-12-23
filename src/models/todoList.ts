// Model-level create helper expects a resolved userId, not the incoming DTO
import { generateId } from "../utils/gereteId";

export default class TodoListModel {
  id: string;
  title: string;
  description: string;
  deliverySchedule: string;
  isCompleted: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;

  constructor(
    id: string,
    title: string,
    description: string,
    deliverySchedule: string,
    isCompleted: boolean,
    userId: string,
    createdAt?: string | Date,
    updatedAt?: string | Date
  ) {
    this.id = id ?? generateId();
    this.title = title;
    this.description = description;
    this.deliverySchedule = deliverySchedule;
    this.isCompleted = isCompleted;
    this.userId = userId;
    this.createdAt = createdAt
      ? typeof createdAt === "string"
        ? createdAt
        : createdAt.toISOString()
      : new Date().toISOString();
    this.updatedAt = updatedAt
      ? typeof updatedAt === "string"
        ? updatedAt
        : updatedAt.toISOString()
      : new Date().toISOString();
  }

  static fromCreate(data: {
    title: string;
    description: string;
    deliverySchedule: string;
    userId: string;
  }): TodoListModel {
    return new TodoListModel(
      generateId(),
      data.title,
      data.description,
      data.deliverySchedule,
      false,
      data.userId
    );
  }
}
