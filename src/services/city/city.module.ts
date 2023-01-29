import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/entities/city.entity';
import { User } from 'src/entities/user.entity';
import { CityResolver } from 'src/resolvers/city/city.resolver';
import { CityService } from './city.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([City, User]),
    ],
    controllers: [],
    providers: [CityService, CityResolver],
    exports: [CityService, CityResolver]
  })
export class CityModule {}
