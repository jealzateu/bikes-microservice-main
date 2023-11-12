import { Param, Controller, Inject, Logger, Post, Req, UseGuards, Get, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetBikeByIdResponse } from './GetBikeById.response';


@Controller('bikes')
@ApiTags('Bikes')
@ApiBearerAuth()
export class GetBikeByIdController {
  constructor(
    @Inject('BIKES_RMQ_CLIENT') private rabbitMQ: ClientProxy
    ) {}
  private readonly logger = new Logger(GetBikeByIdController.name);
  
  @Get('/:id')
  @ApiResponse({
    status: 404,
    description: 'Not Found'
  })
  @ApiResponse({
    status: 200,
    type: GetBikeByIdResponse})
  @ApiParam({name: 'id'})
  async getAll(@Param('id') id: string) {
    this.logger.log(`[GATEWAY]: getBikeById: ${id}`);
    const bike = await this.rabbitMQ.send('getBikeById', {id}).toPromise();
    if(!bike) throw new NotFoundException();
    return bike;

  }
}
