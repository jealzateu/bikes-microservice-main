import { Controller, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';


@Controller('users')
@ApiTags('Users')
export class CreateUserController {
  constructor(
    @Inject('USERS_RMQ_CLIENT') private rabbitMQ: ClientProxy
    ) {}
  private readonly logger = new Logger(CreateUserController.name);
  
  @Post('')
  createUser() {
    this.logger.log(`[GATEWAY]: createUser`);
    return this.rabbitMQ.emit('createUser', {
        username: 'carlosgarcia0624',
        password: 'Password11*',
        role: 'admin'
    });
  }
}
