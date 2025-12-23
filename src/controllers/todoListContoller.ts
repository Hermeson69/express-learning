import { TodoListService } from "../services";
import {
  TodoListCreateInput,
  TodoListUpdateInput,
  TodoListResponse,
  MessageSchema,
} from "../schemas";

import { Request, Response } from "express";

export default class TodoListController {
  private todoListService: TodoListService;

  constructor(todoListService: TodoListService) {
    this.todoListService = todoListService;
  }

  async createTodoList(req: Request, res: Response): Promise<void> {
    try {
      const data: TodoListCreateInput = req.body;
      const newTodoList = await this.todoListService.createTodoList(data);
      res.status(201).json(newTodoList);
    } catch (error) {
      res.status(400).json(
        MessageSchema.parse({
          success: false,
          detail: (error as Error).message,
        })
      );
    }
  }

  async getTodoListById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const todoList = await this.todoListService.getTodoListById(id);
      if (!todoList) {
        res.status(404).json(
          MessageSchema.parse({
            success: false,
            detail: "Todo list not found",
          })
        );
        return;
      }
      res.status(200).json(todoList);
    } catch (error) {
      res.status(400).json(
        MessageSchema.parse({
          success: false,
          detail: (error as Error).message,
        })
      );
    }
  }

  async getAllByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.userId;
      const todoLists = await this.todoListService.getAllByUserId(userId);
      res.status(200).json(todoLists);
    } catch (error) {
      res.status(400).json(
        MessageSchema.parse({
          success: false,
          detail: (error as Error).message,
        })
      );
    }
  }

  async getAllTasksDueToday(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.userId;
      const todoLists = await this.todoListService.getAllTasksDueToday(userId);
      res.status(200).json(todoLists);
    } catch (error) {
      res.status(400).json(
        MessageSchema.parse({
          success: false,
          detail: (error as Error).message,
        })
      );
    }
  }

    async updateTodoList(req: Request, res: Response): Promise<void> {
    try {
      const todoList = await this.todoListService.updateTodoList(
        req.params.id,
        req.body
      );
      res.status(200).json(todoList);
    } catch (error) {
      res.status(400).json(
        MessageSchema.parse({
          success: false,
          detail: (error as Error).message,
        })
      );
    }
  }

  async deleteTodoList(req: Request, res: Response): Promise<void> {
    try {
        const response = await this.todoListService.deleteTodoList(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(
            MessageSchema.parse({
                success: false,
                detail: (error as Error).message,
            })
        );
    }
  }

}
