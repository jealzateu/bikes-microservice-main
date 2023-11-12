import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateBikeService } from '../contexts/bikes/application/createBike.service';
import { UpdateBikeService } from '../contexts/bikes/application/updateBike.service';

@Controller()
  export class UpdateBikeController {
  constructor(
    private readonly updateBikeService: UpdateBikeService
  ) {}

  private readonly logger = new Logger(UpdateBikeController.name);

  @MessagePattern('updateBike')
  async createBike(@Payload() data: any) {
    this.logger.log(`[Bikes]: updateBike :: INIT`);
    return await this.updateBikeService.execute(data);
  }
}