import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetAvailableBikesRequest {
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', enum: ['Available', 'Occupied']})
    status: string;

  }