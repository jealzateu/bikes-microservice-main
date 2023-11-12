import { Controller, Inject, Logger, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllBikesResponse } from './GetAllBikes.response';


@Controller('bikes')
@ApiTags('Bikes')
@ApiBearerAuth()
export class GetAllBikesController {
  constructor(
    @Inject('BIKES_RMQ_CLIENT') private rabbitMQ: ClientProxy
    ) {}
  private readonly logger = new Logger(GetAllBikesController.name);
  
  @Get('')
  @ApiResponse({
    status: 200,
    type: GetAllBikesResponse})
  async getBikeById() {
    this.logger.log(`[GATEWAY]: get all bikes`);
    const bikes = await this.rabbitMQ.send('getAllBikes', {}).toPromise();
    return bikes || [];

  }
}
