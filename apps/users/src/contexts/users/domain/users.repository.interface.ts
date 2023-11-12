import { User } from "@prisma/client";
import { UserDto } from "./user.dto";

export interface IUsersRepository {
    create(data: UserDto): Promise<User>
    findByUserName(username: string): Promise<User | null>
}