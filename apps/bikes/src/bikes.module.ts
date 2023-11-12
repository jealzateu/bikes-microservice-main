import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateBikeService } from './contexts/bikes/application/createBike.service';
import { GetBikeByIdService } from './contexts/bikes/application/getBikeById.service';
import { PrismaService } from './contexts/bikes/infraestructure/prisma.service';
import { BikesRepository } from './contexts/bikes/infraestructure/bikes.postgres.repository';
import { CreateBikeController } from './controllers/createBike.controller';
import { GetBikeByIdController } from './controllers/getBikeById.controller';
import { GetAllBikesService } from './contexts/bikes/application/getAllBikes.service';
import { GetAllBikesController } from './controllers/getAllBikes.controller';
import { UpdateBikeController } from './controllers/updateBike.controller';
import { UpdateBikeService } from './contexts/bikes/application/updateBike.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
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
      }
    ])
  ],
  controllers: [
    CreateBikeController, 
    GetBikeByIdController, 
    GetAllBikesController,
    UpdateBikeController
  ],
  providers: [
    CreateBikeService,
    GetBikeByIdService,
    PrismaService,
    BikesRepository,
    GetAllBikesService,
    UpdateBikeService
  ],
})
export class BikesModule {}
