import { UserModel } from "../models";
import { UserRepository } from "../repositories";
import {
  UserCreateInput,
  UserUpdateInput,
  UserResponse,
  UserLogin,
  AuthResponse,
  Message,
  UserCreateSchema,
  UserUpdateSchema,
  UserResponseSchema,
  UserLoginSchema,
  AuthSchema,
  MessageSchema,
} from "../schemas";

import SecurityUtils from "../utils/security";

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: UserCreateInput): Promise<UserResponse> {
    const validatedData = UserCreateSchema.parse(data);
    const existingUser = await this.userRepository.findByEmail(
      validatedData.email
    );
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    validatedData.password = await SecurityUtils.hashPassword(
      validatedData.password
    );
    const model = UserModel.fromCreate(validatedData);
    const user = await this.userRepository.create(model);
    return UserResponseSchema.parse(user);
  }

  async authenticateUser(data: UserLogin): Promise<AuthResponse> {
    const validData = UserLoginSchema.parse(data);
    const user = await this.userRepository.findByEmail(validData.email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await SecurityUtils.comparePassword(
      validData.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    return AuthSchema.parse({ token: "dummy-token" });
  }

  async getUserById(id: string): Promise<UserResponse> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return UserResponseSchema.parse(user);
  }

  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.userRepository.getAllUsers();
    return users.map((user) => UserResponseSchema.parse(user));
  }

  async updateUser(id: string, data: UserUpdateInput): Promise<UserResponse> {
    const validatedData = UserUpdateSchema.parse(data);
    if (validatedData.password) {
      validatedData.password = await SecurityUtils.hashPassword(
        validatedData.password
      );
    }
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    if (validatedData.name) user.name = validatedData.name;
    if (validatedData.email) user.email = validatedData.email;
    if (validatedData.password) user.password = validatedData.password;
    user.updatedAt = new Date().toISOString();
    const updatedUser = await this.userRepository.update(id, user);
    return UserResponseSchema.parse(updatedUser);
  }

  async deleteUser(id: string): Promise<Message> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await this.userRepository.delete(id);
    return MessageSchema.parse({
      success: true,
      detail: "User deleted successfully",
    });
  }
}
