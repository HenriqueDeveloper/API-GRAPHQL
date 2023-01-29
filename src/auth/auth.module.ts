import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guards/jwt-strategy'; 
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/services/user/user.service'; 
import { AuthController } from './auth.controller';
import { AuthResolver } from 'src/resolvers/auth/auth.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'super-secret',
      signOptions: {
        expiresIn: 18000,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, AuthResolver],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}