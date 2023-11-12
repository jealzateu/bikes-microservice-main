import { Controller, Get, Inject, Logger, Param } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetAllEventsResponse } from "./cordinates.response";

@Controller('cordinates')
@ApiTags('Cordinates')
export class GetBikeCordinates {
  constructor(
    @Inject('CORDINTES_RMQ_CLIENT') private rabbitMQ: ClientProxy
    ) {}
  private readonly logger = new Logger(GetBikeCordinates.name);
  
  @Get('')
  @ApiResponse({type: GetAllEventsResponse})
  @ApiParam({name: 'id'})
  async getCordinates(@Param('id') id: string) {
    this.logger.log(`[GATEWAY]: getCordinates`);
    return await this.rabbitMQ.send('getCordinates', {id}).toPromise();
  }
}
