import { compare } from 'bcrypt';
import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../infraestructure/prisma/users.postgres.repository';
import { User } from '@prisma/client';



@Injectable()
export class LoginApplication{

  constructor(
    private readonly usersRepository: UsersRepository
  ) {}
  private readonly logger = new Logger(LoginApplication.name);
  async execute({ password, username }: {username: string, password: string}): Promise<User | boolean> {
    this.logger.log(`[${this.execute.name}] :: INIT`);
    const user = await this.usersRepository.findByUserName(username);
    if (!user) {
        return false;
      }
      const isPasswordValid = await compare(password, user.password);
      return isPasswordValid? user: false;
    }
}
