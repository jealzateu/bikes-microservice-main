import { ApiProperty } from "@nestjs/swagger";

export class UpdateResponse {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  brand: string;

  @ApiProperty({ type: 'string' })
  type: string;

  @ApiProperty({ type: 'string' })
  color: string;
}