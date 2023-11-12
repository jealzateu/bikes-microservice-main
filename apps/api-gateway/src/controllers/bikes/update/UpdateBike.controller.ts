import { Controller, Inject, Logger, Param, Body, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../../auth/auth.admin.guard';
import { UpdateBikesRequest } from './UpdateBike.request';
import { UpdateResponse } from './UpdateBikes.response';


@Controller('bikes')
@ApiTags('Bikes')
@ApiBearerAuth()
export class UpdateBikeControllerController {
  constructor(
    @Inject('BIKES_RMQ_CLIENT') private rabbitMQ: ClientProxy
    ) {}
  private readonly logger = new Logger(UpdateBikeControllerController.name);
  
  @Put('/:id')
  //@UseGuards(AdminGuard)
  @ApiResponse({
    status: 404,
    description: 'Not Found'
  })
  @ApiResponse({
    status: 200,
    type: UpdateResponse})
  @ApiParam({name: 'id'})
  async update(@Param('id') id: string, @Body() body: UpdateBikesRequest) {
    this.logger.log(`[GATEWAY]: update bikes`);
    return await this.rabbitMQ.send('updateBike', {id: Number(id), ...body}).toPromise();

  }
}
