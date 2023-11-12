import { ApiProperty } from "@nestjs/swagger";
import { GetBikeByIdResponse } from "../getById/GetBikeById.response";

export class GetAllBikesResponse {

  @ApiProperty({ isArray: true, type: GetBikeByIdResponse})
  results: Array<GetBikeByIdResponse>
  
  }