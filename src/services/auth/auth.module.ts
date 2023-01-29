import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guards/jwt-strategy'; 
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/services/user/user.service'; 
import { AuthResolver } from 'src/resolvers/auth/auth.resolver';
import { City } from 'src/entities/city.entity';
import { Address } from 'src/entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, City, Address]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'super-secret',
      signOptions: {
        expiresIn: 18000,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService, AuthResolver],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}