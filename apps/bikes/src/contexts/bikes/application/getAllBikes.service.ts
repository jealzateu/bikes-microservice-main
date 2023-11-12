import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Bicycle } from '@prisma/client';
import { BikeDto } from '../domain/bike.dto';
import { BikesRepository } from '../infraestructure/bikes.postgres.repository';

@Injectable()
export class GetAllBikesService{

  constructor(
    private readonly bikesRepository: BikesRepository
  ) {}
  private readonly logger = new Logger(GetAllBikesService.name);
  async execute(): Promise<Array<Bicycle>> {
    this.logger.log(`[${this.execute.name}] :: INIT :: id:`);
    return await this.bikesRepository.findAll();
  }
}
