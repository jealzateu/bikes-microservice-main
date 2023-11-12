import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreateBikeService } from '../contexts/bikes/application/createBike.service';

@Controller()
  export class CreateBikeController {
  constructor(
    @Inject('RENTAL_RMQ_CLIENT') private rabbitMQ: ClientProxy,
    private readonly createBikeService: CreateBikeService
  ) {}

  private readonly logger = new Logger(CreateBikeController.name);

  @EventPattern('createBike')
  async createBike(@Payload() data: any) {
    this.logger.log(`[Bikes]: createBike :: INIT`);
    const bike = await this.createBikeService.execute(data);
    const a = this.rabbitMQ.connect;
    await this.rabbitMQ.send('addBikeToCatalog', bike).toPromise();
  }
}