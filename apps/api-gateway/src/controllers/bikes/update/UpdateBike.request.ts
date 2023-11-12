import { ApiProperty } from "@nestjs/swagger";
import { GetBikeByIdResponse } from "../getById/GetBikeById.response";

export class UpdateBikesRequest {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  brand: string;

  @ApiProperty({ type: 'string' })
  type: string;

  @ApiProperty({ type: 'string' })
  color: string;
}