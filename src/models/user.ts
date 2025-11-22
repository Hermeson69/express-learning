import { UserCreateInput } from "../schemas";
import { generateId } from "../utils/gereteId";

export default class UserModel {
    
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        id: string,
        name: string,
        email: string,
        password: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id ?? generateId();
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

        static fromCreate(data: UserCreateInput): UserModel {
            return new UserModel(
                null as any,
                data.name,
                data.email,
                data.password
            );
        }
    }