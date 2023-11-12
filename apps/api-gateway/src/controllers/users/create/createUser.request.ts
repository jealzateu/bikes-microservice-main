import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserRequest {
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string' })
    username: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', enum: ['Admin', 'Cyclist'] })
    role: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string' })
    password: string;
  }