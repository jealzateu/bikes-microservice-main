import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BikesModule } from './bikes.module';

async function bootstrap() {
  const app = await NestFactory.create(BikesModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'bikes',
      queueOptions: {
        durable: true
      },
    },
    });
  await app.startAllMicroservices();
}
bootstrap();
