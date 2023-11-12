import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  private readonly logger = new Logger(EventsController.name);

  @MessagePattern('getAllEvents')
  async getAllEvents(@Payload() data: any) {
    this.logger.log(`[Events]: getAllEvents :: INIT: data: ${JSON.stringify(data)}`);
    return await this.eventsService.getAllEvents();
  }

  @MessagePattern('getEventById')
  async getEventById(@Payload() data: any) {
    this.logger.log(`[Events]: get Event By id:: INIT: data: ${JSON.stringify(data)}`);
    return await this.eventsService.getEventById(data);
  }

  @MessagePattern('deleteEvent')
  async deleteEvent(@Payload() data: any) {
    this.logger.log(`[Events]: deleteEvent :: INIT: data: ${JSON.stringify(data)}`);
    return await this.eventsService.delete(data);
  }
  
  @EventPattern('createEvent')
  async createEvent(@Payload() data: any) {
    this.logger.log(`[Events]: createEvent :: INIT: data: ${JSON.stringify(data)}`);
    return await this.eventsService.createEvent(data);
  }

  @EventPattern('updateEvent')
  async updateEvent(@Payload() data: any) {
    this.logger.log(`[Events]: updateEvent :: INIT: data: ${JSON.stringify(data)}`);
    return await this.eventsService.updateEvent({...data, id: Number});
  }
}
