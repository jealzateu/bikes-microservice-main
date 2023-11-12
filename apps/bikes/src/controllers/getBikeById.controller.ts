import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateBikeService } from '../contexts/bikes/application/createBike.service';
import { GetBikeByIdService } from '../contexts/bikes/application/getBikeById.service';

@Controller()
  export class GetBikeByIdController {
  constructor(
    private readonly getBikeByIdService: GetBikeByIdService
  ) {}

  private readonly logger = new Logger(GetBikeByIdController.name);

  @EventPattern('getBikeById')
  async getBikeById(@Payload() data: any) {
    this.logger.log(`[Bikes]: get bike by id :: INIT`);
    return await this.getBikeByIdService.execute(Number(data.id));
  }
}