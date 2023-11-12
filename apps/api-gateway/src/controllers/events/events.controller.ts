import { Body, Controller, Delete, Get, Inject, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../auth/auth.admin.guard';
import { CreateEventRequest, Event } from './requests';
import { GetAllEventsResponse } from './responses';


@Controller('events')
@ApiTags('Events')
@ApiBearerAuth()
export class EventsController {
  constructor(
    @Inject('EVENTS_RMQ_CLIENT') private rabbitMQ: ClientProxy
    ) {}
  private readonly logger = new Logger(EventsController.name);
  

  @Get('')
  @ApiResponse({type: GetAllEventsResponse})
  async getAllEvents() {
    this.logger.log(`[Events]: getAllEvents`);
    return await this.rabbitMQ.send('getAllEvents', {}).toPromise();
  }

  @Get('/:id')
  @ApiResponse({type: Event})
  @ApiParam({name: 'id'})
    async getEventById(@Param('id') id: string) {   
        this.logger.log(`[Events]: getEventById`, id);
        return await this.rabbitMQ.send('getEventById', {id: Number(id)}).toPromise();
     }

  @Delete('/:id')
  @ApiResponse({type: Event})
  @ApiParam({name: 'id'})
    async deleteEvent(@Param('id') id: string) {   
        this.logger.log(`[Events]: deleteEvent`, id);
        return await this.rabbitMQ.send('deleteEvent', {id: Number(id)}).toPromise();
     }

  @Post('')
  @UseGuards(AdminGuard)
  async createEvent(@Body() body: CreateEventRequest) {
    this.logger.log(`[Events]: createEvent`);
    return await this.rabbitMQ.emit('createEvent', body);
  }

  @Put('/:id')
  @ApiParam({name: 'id'})
  @UseGuards(AdminGuard)
  async updateEvent(@Body() body: CreateEventRequest, @Param('id') id: string) {
    this.logger.log(`[Events]: updateEvent`);
    return await this.rabbitMQ.emit('updateEvent', {...body, id: Number(id)});
  }
}

