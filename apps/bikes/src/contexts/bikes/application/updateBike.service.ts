import { BadGatewayException, BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Bicycle } from '@prisma/client';
import { BikeDto } from '../domain/bike.dto';
import { BikesRepository } from '../infraestructure/bikes.postgres.repository';

@Injectable()
export class UpdateBikeService{

  constructor(
    private readonly bikesRepository: BikesRepository
  ) {}
  private readonly logger = new Logger(UpdateBikeService.name);
  async execute(bike: BikeDto): Promise<Bicycle> {
    this.logger.log(`[${this.execute.name}] :: INIT`);
    if(!bike || !bike.id) throw new BadRequestException('Id required')
    return await this.bikesRepository.update(bike);
  }
}
