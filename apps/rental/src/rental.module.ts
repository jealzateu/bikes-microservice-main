import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([])
  ],
  controllers: [RentalController],
  providers: [RentalService, PrismaService],
})
export class RentalModule {}
