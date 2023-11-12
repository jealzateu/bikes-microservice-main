import { Injectable } from "@nestjs/common";
import { IUsersRepository } from "../../domain/users.repository.interface";
import { PrismaService } from "./prisma.service";
import { Bicycle, Prisma, User } from '@prisma/client';
import { UserDto } from "../../domain/user.dto";

@Injectable()
export class UsersRepository implements IUsersRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: UserDto): Promise<User> {
        return this.prisma.user.create({data});
    }

    async findByUserName(username: string): Promise<User> {
        return this.prisma.user.findFirst({where: {username}});
    }
}