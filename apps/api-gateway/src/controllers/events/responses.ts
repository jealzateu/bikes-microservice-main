import { ApiProperty } from "@nestjs/swagger";
import { Event } from "./requests";

export class GetAllEventsResponse {
    
    @ApiProperty({ isArray: true, type: Event})
    results: Array<Event>

}
