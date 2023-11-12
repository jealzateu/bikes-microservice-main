import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CordinatesModule } from './cordinates.module';

async function bootstrap() {
  const app = await NestFactory.create(CordinatesModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'cordinates',
      queueOptions: {
        durable: true
      },
    },
    });
  await app.startAllMicroservices();
}
bootstrap();
