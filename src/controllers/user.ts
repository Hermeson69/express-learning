import { UserService } from "../services";
import {
  UserCreateInput,
  UserLogin,
  AuthResponse,
  MessageSchema,
} from "../schemas";

import { Request, Response } from "express";

export default class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const data: UserCreateInput = req.body;
      const newUser = await this.userService.createUser(data);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json(
        MessageSchema.parse({
          success: false,
          detail: (error as Error).message,
        })
      );
    }
  }

  async authenticateUser(req: Request, res: Response): Promise<void> {
    try {
      const credentials: UserLogin = req.body;
      const authResponse: AuthResponse = await this.userService.authenticateUser(credentials);
      res.status(200).json(authResponse);
    } catch (error) {
      res.status(400).json(
        MessageSchema.parse({
          success: false,
          detail: (error as Error).message,
        })
      );
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const user = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(
        MessageSchema.parse({
          success: false,
          detail: (error as Error).message,
        })
      );
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(
        MessageSchema.parse({
          success: false,
          detail: (error as Error).message,
        })
      );
    }
  };

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(
        MessageSchema.parse({
          success: false,
          detail: (error as Error).message,
        })
      );
    }
  };

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
        const response = await this.userService.deleteUser(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(
            MessageSchema.parse({
                success: false,
                detail: (error as Error).message,
            })
        );
    } 
  };
}
