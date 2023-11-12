import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserService } from '../contexts/users/application/createUser.service';
import { LoginApplication } from '../contexts/users/application/login.application';


@Controller()
  export class LoginController {
  constructor(
    private readonly loginApplication: LoginApplication
  ) {}

  private readonly logger = new Logger(LoginController.name);
  
  @MessagePattern('login')
  async createUser(@Payload() data: any) {
    this.logger.log(`[USERS]: login :: INIT`);
    return this.loginApplication.execute(data);
  }
}