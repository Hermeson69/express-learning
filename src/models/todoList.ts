import { TodoListCreateInput } from "../schemas/todoList";

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
        this.id = id;
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

    static fromCreate(data: TodoListCreateInput): TodoListModel {
        return new TodoListModel(
            null as any,
            data.title,
            data.description,
            data.deliverySchedule,
            false,
            data.userId
        );
    }
}