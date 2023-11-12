import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { GetAllBikesService } from '../contexts/bikes/application/getAllBikes.service';

@Controller()
  export class GetAllBikesController {
  constructor(
    private readonly getAllBikesService: GetAllBikesService
  ) {}

  private readonly logger = new Logger(GetAllBikesController.name);

  @EventPattern('getAllBikes')
  async getBikeById(@Payload() data: any) {
    this.logger.log(`[Bikes]: get all bikes :: INIT`);
    return await this.getAllBikesService.execute();
  }
}