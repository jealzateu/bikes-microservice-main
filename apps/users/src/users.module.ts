import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateUserService } from './contexts/users/application/createUser.service';
import { PrismaService } from './contexts/users/infraestructure/prisma/prisma.service';
import { CreateUserController } from './controllers/createUser.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersRepository } from './contexts/users/infraestructure/prisma/users.postgres.repository';
import { LoginController } from './controllers/login.controller';
import { LoginApplication } from './contexts/users/application/login.application';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([])
  ],
  controllers: [LoginController, CreateUserController],
  providers: [
    UsersRepository,
    PrismaService, 
    CreateUserService,
    LoginApplication
  ],
})
export class UsersModule {}
