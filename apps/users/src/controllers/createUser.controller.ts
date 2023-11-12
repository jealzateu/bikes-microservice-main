import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserService } from '../contexts/users/application/createUser.service';


@Controller()
  export class CreateUserController {
  constructor(
    private readonly createUserService: CreateUserService
  ) {}

  private readonly logger = new Logger(CreateUserController.name);
  
  //Broker-Based controller
  @EventPattern('createUser')
  async createUser(@Payload() data: any) {
    this.logger.log(`[USERS]: createUser :: INIT`);
    await this.createUserService.execute(data);
  }
}