import { UserCreateInput } from "../schemas";
import { generateId } from "../utils/gereteId";

export default class UserModel {
    
    id: string;
    name: string;
    email: string;
    password: string;

    constructor(
        id: string,
        name: string,
        email: string,
        password: string
    ) {
        this.id = id ?? generateId();
        this.name = name;
        this.email = email;
        this.password = password;
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