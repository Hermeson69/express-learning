import { TodoListModel } from "../models";
import { TodoListRepository, UserRepository } from "../repositories";
import {
  TodoListCreateInput,
  TodoListUpdateInput,
  TodoListResponse,
  Message,
  TodoListCreateSchema,
  TodoListUpdateSchema,
  TodoListResponseSchema,
  MessageSchema,
} from "../schemas";

export default class TodoListService {
  private todoListRepository: TodoListRepository;
  private userRepository: UserRepository;

  constructor(
    todoListRepository: TodoListRepository,
    userRepository: UserRepository
  ) {
    this.todoListRepository = todoListRepository;
    this.userRepository = userRepository;
  }

  async createTodoList(data: TodoListCreateInput): Promise<TodoListResponse> {
    const validatedData = TodoListCreateSchema.parse(data);
    const user = await this.userRepository.findByName(validatedData.userName);
    if (!user) {
      throw new Error("User not found for provided name");
    }

    const model = new TodoListModel(
      undefined as any,
      validatedData.title,
      validatedData.description,
      validatedData.deliverySchedule,
      false,
      user.id
    );
    const todoList = await this.todoListRepository.create(model);
    return TodoListResponseSchema.parse(todoList);
  }

  async getTodoListById(id: string): Promise<TodoListResponse | null> {
    const todoList = await this.todoListRepository.getById(id);
    if (!todoList) {
      return null;
    }
    return TodoListResponseSchema.parse(todoList);
  }

  async getAllByUserId(userId: string): Promise<TodoListResponse[]> {
    const todoLists = await this.todoListRepository.getAllByUserId(userId);
    return todoLists.map((todoList) => TodoListResponseSchema.parse(todoList));
  }

  async getAllTasksDueToday(userId: string): Promise<TodoListResponse[]> {
    const todoLists = await this.todoListRepository.getAllTasksfromSchedule(
      userId
    );
    return todoLists.map((todoList) => TodoListResponseSchema.parse(todoList));
  }

  async updateTodoList(
    id: string,
    data: TodoListUpdateInput
  ): Promise<TodoListResponse> {
    const validatedData = TodoListUpdateSchema.parse(data);
    const todoList = await this.todoListRepository.getById(id);
    if (!todoList) {
      throw new Error("Todo list not found");
    }
    if (validatedData.title) todoList.title = validatedData.title;
    if (validatedData.description)
      todoList.description = validatedData.description;
    if (validatedData.deliverySchedule)
      todoList.deliverySchedule = validatedData.deliverySchedule;
    if (validatedData.isCompleted !== undefined)
      todoList.isCompleted = validatedData.isCompleted;
    todoList.updatedAt = new Date().toISOString();
    await this.todoListRepository.update(todoList);
    return TodoListResponseSchema.parse(todoList);
  }

  async deleteTodoList(id: string): Promise<Message> {
    const todoList = await this.todoListRepository.getById(id);
    if (!todoList) {
      throw new Error("Todo list not found");
    }
    await this.todoListRepository.delete(id);
    return MessageSchema.parse({ message: "Todo list deleted successfully" });
  }
}
