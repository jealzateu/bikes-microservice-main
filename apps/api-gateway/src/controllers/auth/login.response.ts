import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({ format: 'Bearer', type: 'string' })
  acces_token: string;
}