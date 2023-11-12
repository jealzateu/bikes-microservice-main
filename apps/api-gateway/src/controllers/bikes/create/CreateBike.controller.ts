import { Body, Controller, Inject, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../../auth/auth.admin.guard';
import { AuthGuard } from '../../auth/auth.guard';
import { CreateBikeRequest } from './createBike.request';


@Controller('bikes')
@ApiTags('Bikes')
@ApiBearerAuth()
export class CreateBikeController {
  constructor(
    @Inject('BIKES_RMQ_CLIENT') private rabbitMQ: ClientProxy
    ) {}
  private readonly logger = new Logger(CreateBikeController.name);
  
  @Post('')
  @UseGuards(AdminGuard)
  createBike(@Body() body: CreateBikeRequest) {
    this.logger.log(`[GATEWAY]: createBike`);
    return this.rabbitMQ.emit('createBike', body);
  }
}
