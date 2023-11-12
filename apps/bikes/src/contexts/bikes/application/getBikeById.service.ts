import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Bicycle } from '@prisma/client';
import { BikeDto } from '../domain/bike.dto';
import { BikesRepository } from '../infraestructure/bikes.postgres.repository';

@Injectable()
export class GetBikeByIdService{

  constructor(
    private readonly bikesRepository: BikesRepository
  ) {}
  private readonly logger = new Logger(GetBikeByIdService.name);
  async execute(id: number): Promise<Bicycle> {
    this.logger.log(`[${this.execute.name}] :: INIT :: id: ${id}`);
    const bike = await this.bikesRepository.findById(id);
    return bike;
  }
}
