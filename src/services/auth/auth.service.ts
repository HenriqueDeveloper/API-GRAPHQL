import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from 'src/dtos/credentials.dto';
import { UsersService } from '../user/user.service'; 

@Injectable()
export class AuthService {

  constructor(
      private userService: UsersService,
      private jwtService: JwtService,
  ){}

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.userService.checkCredentials(credentialsDto);    
    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }    
    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);    
    return { token, user: user};
  }
}
