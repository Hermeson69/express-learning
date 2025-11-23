import { UserCreateInput } from "../schemas";
import { generateId } from "../utils/gereteId";

export default class UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt?: string | Date,
    updatedAt?: string | Date
  ) {
    this.id = id ?? generateId();
    this.name = name;
    this.email = email;
    this.password = password;
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

  static fromCreate(data: UserCreateInput): UserModel {
    return new UserModel(null as any, data.name, data.email, data.password);
  }
}
