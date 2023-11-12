import { Injectable, Logger } from '@nestjs/common';
import { Bicycle } from '@prisma/client';
import { BikeDto } from '../domain/bike.dto';
import { BikesRepository } from '../infraestructure/bikes.postgres.repository';

@Injectable()
export class CreateBikeService{

  constructor(
    private readonly bikesRepository: BikesRepository
  ) {}
  private readonly logger = new Logger(CreateBikeService.name);
  async execute(bike: BikeDto): Promise<Bicycle> {
    this.logger.log(`[${this.execute.name}] :: INIT`);
    return await this.bikesRepository.create(bike);
  }
}
