import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RentalService } from './rental.service';

@Controller()
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  private readonly logger = new Logger(RentalController.name);

  @MessagePattern('addBikeToCatalog')
  async addBikeToCatalog(@Payload() data: any) {
    this.logger.log(`[Rental]: addBikeToCatalog :: INIT: data: ${JSON.stringify(data)}`);
    await this.rentalService.addBikeToCatalog(data);
  }
  
  @MessagePattern('bookBike')
  async bookBike(@Payload() data: any) {
    this.logger.log(`[Rental]: bookBike :: INIT: data: ${JSON.stringify(data)}`);
    const result = await this.rentalService.bookBike(data);
    return !!result
  }

  @MessagePattern('checkout')
  async checkout(@Payload() data: any) {
    this.logger.log(`[Rental]: checkout :: INIT: data: ${JSON.stringify(data)}`);
    const result = await this.rentalService.checkout(data);
    return !!result
  }

  @MessagePattern('getAvailableBikes')
  async getAvailableBikes(@Payload() data: any) {
    this.logger.log(`[Rental]: getAvailableBikes :: INIT`);
    return await this.rentalService.getAvailableBikes(data);
  }

}
