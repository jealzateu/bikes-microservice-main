import { ApiProperty } from "@nestjs/swagger";

export class Bike {
  
    @ApiProperty({ type: 'string' })
    id: string;

    @ApiProperty({ type: 'string' })
    brand: string;
  
    @ApiProperty({ type: 'string' })
    type: string;

    @ApiProperty({ type: 'string' })
    color: string;

    @ApiProperty({ type: 'string' })
    status: string;
  }

  export class GetAvailableBikesResponse {
    @ApiProperty({ isArray: true, type: Bike})
    results: Array<Bike>
}

  export class RentBikesResponse {
    @ApiProperty({ isArray: true, type: Bike})
    success: boolean
}