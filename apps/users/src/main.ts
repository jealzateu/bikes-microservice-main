import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'users',
      queueOptions: {
        durable: true
      },
    },
    });
  await app.startAllMicroservices(); //Hybrid app, lisents tcp, and mqtt
}
bootstrap();
