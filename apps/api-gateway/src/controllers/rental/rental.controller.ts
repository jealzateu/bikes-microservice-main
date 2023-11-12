import { Controller, Get, Inject, Logger, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { GetAvailableBikesRequest } from './requests';
import { GetAvailableBikesResponse, RentBikesResponse } from './responses';


@Controller('rental')
@ApiTags('Rental')
@ApiBearerAuth()
export class RentalController {
  constructor(
    @Inject('RENTAL_RMQ_CLIENT') private rabbitMQ: ClientProxy
    ) {}
  private readonly logger = new Logger(RentalController.name);
  

  @Get('')
  @ApiResponse({type: GetAvailableBikesResponse})
  async getAvailableBikes(@Query() query: GetAvailableBikesRequest) {
    this.logger.log(`[GATEWAY]: getAvailableBikes`, query);
    return await this.rabbitMQ.send('getAvailableBikes', query).toPromise();
  }

  @Patch('/book/:id')
  @ApiResponse({type: RentBikesResponse})
  @UseGuards(AuthGuard)
  @ApiParam({name: 'id'})
  async bookBike(@Param('id') id: string, @Req()request: any) {
    try {    
        const user = request.user;
        this.logger.log(`[GATEWAY]: bookBike`, id);
        const response = new RentBikesResponse();
        response.success = await this.rabbitMQ.send('bookBike', {id: Number(id), username: user.username}).toPromise();
        return response;
    }catch(error){
        this.logger.error(JSON.stringify(error));
        throw new Error(error);
    }
  }

  @Patch('/checkout/:id')
  @ApiResponse({type: RentBikesResponse})
  @UseGuards(AuthGuard)
  @ApiParam({name: 'id'})
  async checkoutBike(@Param('id') id: string) {
    this.logger.log(`[GATEWAY]: bookBike`, id);
    const response = new RentBikesResponse();
    response.success = await this.rabbitMQ.send('checkout', {id: Number(id)}).toPromise();
    return response;
  }
}

