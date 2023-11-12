import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RentalModule } from './rental.module';

async function bootstrap() {
  const app = await NestFactory.create(RentalModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'rental',
      queueOptions: {
        durable: true
      },
    },
    });
  await app.startAllMicroservices();
}
bootstrap();
