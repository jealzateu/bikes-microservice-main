import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoginController } from './controllers/auth/login.controller';
import { CreateBikeController } from './controllers/bikes/create/CreateBike.controller';
import { GetAllBikesController } from './controllers/bikes/getAll/GetAllBikes.controller';
import { GetBikeByIdController } from './controllers/bikes/getById/GetBikeById.controller';
import { UpdateBikeControllerController } from './controllers/bikes/update/UpdateBike.controller';
import { GetBikeCordinates } from './controllers/cordinates/cordinates';
import { EventsController } from './controllers/events/events.controller';
import { RentalController } from './controllers/rental/rental.controller';
import { CreateUserController } from './controllers/users/create/createUser.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '6h'},
      global: true,
  }),
    ClientsModule.register([
      {
        name: 'USERS_RMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'users',
          queueOptions: {
            durable: true
          },
        },
      },
      {
        name: 'BIKES_RMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'bikes',
          queueOptions: {
            durable: true
          },
        },
      },
      {
        name: 'RENTAL_RMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'rental',
          queueOptions: {
            durable: true
          },
        },
      },
      {
        name: 'EVENTS_RMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'events',
          queueOptions: {
            durable: true
          },
        },
      },
      {
        name: 'CORDINTES_RMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'cordinates',
          queueOptions: {
            durable: true
          },
        },
      }
    ])
  ],
  controllers: [
    LoginController, 
    CreateUserController,
    CreateBikeController,
    GetBikeByIdController,
    GetAllBikesController,
    UpdateBikeControllerController,
    RentalController,
    EventsController,
    GetBikeCordinates
  ],
  providers: [],
})
export class ApiGatewayModule {}
