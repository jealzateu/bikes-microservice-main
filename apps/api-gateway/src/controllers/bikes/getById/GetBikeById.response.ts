import { ApiProperty } from "@nestjs/swagger";

export class GetBikeByIdResponse {
  
    @ApiProperty({ type: 'string' })
    id: string;

    @ApiProperty({ type: 'string' })
    brand: string;
  
    @ApiProperty({ type: 'string' })
    type: string;

    @ApiProperty({ type: 'string' })
    color: string;
  }