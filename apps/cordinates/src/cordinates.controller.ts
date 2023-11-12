import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventsController } from '../../events/src/events.controller';
import { CordinatesService } from './cordinates.service';

@Controller()
export class CordinatesController {
  constructor(private readonly cordinatesService: CordinatesService) {}

  private readonly logger = new Logger(EventsController.name);

  @MessagePattern('getCordinates')
  async getCordinates(@Payload() data: any) {
    this.logger.log(`[Cordinates]: Get cordinates: INIT: data: ${JSON.stringify(data)}`);
    const cordinate =Math.floor(Math.random() * 11);
    const cordinates = [
      {latitude: 5.25184, longitude: -72.56359},
      {latitude: 7.25184, longitude: -73.56359},
      {latitude: 6.25120, longitude: -70.58359},
      {latitude: 5.95184, longitude: -75.66359},
      {latitude: 9.25184, longitude: -65.56359},
      {latitude: 4.25184, longitude: -78.56359},
      {latitude: 6.25184, longitude: -79.56359},
      {latitude: 4.25184, longitude: -78.56359},
      {latitude: 6.99184, longitude: -73.56359},
      {latitude: 6.25184, longitude: -75.56359},
    ]
    console.log(cordinate)
    return cordinates[cordinate];
  }
}
