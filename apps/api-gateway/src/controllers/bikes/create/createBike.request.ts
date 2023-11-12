import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBikeRequest {
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string' })
    brand: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string' })
    type: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string' })
    color: string;
  }