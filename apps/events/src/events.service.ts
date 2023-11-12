import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { EventDto } from './EventDto';
import { PrismaService } from './prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) { }

  async createEvent(data: EventDto):Promise<void> {
    await this.prisma.event.create({data});
  }

  async updateEvent(data: EventDto):Promise<void> {
    await this.prisma.event.update({
      where: {id: Number(data.id)},
      data
    });
  }
  
  async getAllEvents():Promise<Array<Event>> {
    return await this.prisma.event.findMany({})
  }
  async getEventById({id}: {id: number}):Promise<Event> {
    return await this.prisma.event.findFirst({
      where: { id }
    })
  }
  async delete({id}: {id: number}):Promise<Event> {
    return await this.prisma.event.delete({
      where: { id },
    })
  }
}
