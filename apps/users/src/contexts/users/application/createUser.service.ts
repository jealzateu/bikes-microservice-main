import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from '../domain/user.dto';
import { UsersRepository } from '../infraestructure/prisma/users.postgres.repository';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class CreateUserService{ 
  constructor(
    private readonly usersRepository: UsersRepository
  ) {}
  private readonly logger = new Logger(CreateUserService.name);
  async execute(user: UserDto): Promise<User> {
    this.logger.log(`[${this.execute.name}] :: INIT`);
    const { password: plainPassword } = user;
    const password = await hash(plainPassword, 10);
    return await this.usersRepository.create({...user, password} as UserDto);
  }
}
