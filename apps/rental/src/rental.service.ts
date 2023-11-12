import { Injectable } from '@nestjs/common';
import { Rental } from '@prisma/client';
import { BikeDto } from './bikeDto';
import { PrismaService } from './prisma.service';

@Injectable()
export class RentalService {
  constructor(private prisma: PrismaService) { }

  async addBikeToCatalog(data: BikeDto):Promise<void> {
    data.status = 'Available';
    await this.prisma.rental.create({data});
  }
  
  async getAvailableBikes(data: {status: string}):Promise<Array<Rental>> {
    return await this.prisma.rental.findMany({
      where: {
          status: data.status
      }
    })
  }
  async bookBike({id, username}: {id: number, username: string | null}):Promise<Rental> {
    return await this.prisma.rental.update({
      where: { id },
      data: {
          status: 'Occupied',
          username
      }
    })
  }
  async checkout({id}: {id: number}):Promise<Rental> {
    return await this.prisma.rental.update({
      where: { id },
      data: {
          status: 'Available',
          username: null
      }
    })
  }
}
