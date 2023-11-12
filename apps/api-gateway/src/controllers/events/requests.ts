import { ApiProperty, OmitType } from "@nestjs/swagger";

export class Event {
  
    @ApiProperty({ type: String })
    id: string;

    @ApiProperty({ type: String })
    name: string;
  
    @ApiProperty({ type: Date })
    date: Date;

    @ApiProperty({ type: String })
    location: string;

    @ApiProperty({ type: Boolean })
    competition: boolean;
    
    @ApiProperty({ type: Number })
    prize: number
  }

  export class CreateEventRequest {
    @ApiProperty({ type: String })
    name: string;
  
    @ApiProperty({ type: Date })
    date: Date;

    @ApiProperty({ type: String })
    location: string;

    @ApiProperty({ type: Boolean })
    competition: boolean;
    
    @ApiProperty({ type: Number })
    prize: number
  }