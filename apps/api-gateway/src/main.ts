import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.setGlobalPrefix('v1');
  const documentOptions = new DocumentBuilder()
  .setTitle('Eafit bycicles system gateway')
  .setDescription('Eafit bycicles system gateway')
  .setVersion('1.0')
  .setBasePath('v1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('swagger', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
