import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CordinatesController } from './cordinates.controller';
import { CordinatesService } from './cordinates.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CordinatesController],
  providers: [CordinatesService],
})
export class CordinatesModule {}
