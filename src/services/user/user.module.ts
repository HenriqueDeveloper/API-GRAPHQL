import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/entities/city.entity';
import { User } from 'src/entities/user.entity';
import { UserResolver } from 'src/resolvers/user/user.resolver';
import { UsersService } from 'src/services/user/user.service'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([User, City]),
      PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [UsersService, UserResolver],
    exports:[UsersService, PassportModule]
})

export class UserModule {}
