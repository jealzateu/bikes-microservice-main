import { ApiProperty } from "@nestjs/swagger";

export class GetAllEventsResponse {
    
    @ApiProperty({ type: Number})
    latitude: number

    @ApiProperty({ type: Number})
    longitude: number

}