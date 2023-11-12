import { Body, Controller, Inject, Logger, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequest } from './login.request';
import { LoginResponse } from './login.response';



@Controller('auth')
@ApiTags('Auth')
export class LoginController {
  constructor(
    @Inject('USERS_RMQ_CLIENT') private rabbitMQ: ClientProxy,
    private readonly jwt: JwtService
    ) {}
  private readonly logger = new Logger(LoginController.name);
  
  @Post('')
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: LoginResponse
  })
  async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    this.logger.log(`[GATEWAY]: login`);
    const result = await this.rabbitMQ.send('login', body).toPromise();
    if(!result) throw new UnauthorizedException();
    const {password, ...payload} = result;
    const response = new LoginResponse;
    response.acces_token = this.jwt.sign(payload);
    this.logger.log(result);
    return response;
  }
}
