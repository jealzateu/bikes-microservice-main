import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginRequest {
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string' })
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string' })
    password: string;
  }