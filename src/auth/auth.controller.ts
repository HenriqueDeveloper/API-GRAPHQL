import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CredentialsDto } from 'src/dtos/credentials.dto';
import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/services/auth/auth.service';
import { GetUser } from './get-user.decorator';

@Controller("auth")
export class AuthController {
  
  constructor(
    private authService: AuthService,
  ){}

  @Post("/signin")
  async signIn(@Body(ValidationPipe) credentiaslsDto: CredentialsDto) {
    return await this.authService.signIn(credentiaslsDto);
  }

}