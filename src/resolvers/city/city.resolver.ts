import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/util/role.decorator';
import { CreateCityDto } from 'src/dtos/create-city.dto';
import { City } from 'src/entities/city.entity';
import { Roles } from 'src/enum/user-role.enum';
import { GqlAuthGuard } from 'src/guards/auth.guard';
import { GraphQLRolesGuard } from 'src/guards/graphql-role.guard';
import { CityService } from 'src/services/city/city.service';

@Resolver(() => City)
export class CityResolver {
  constructor(private cityService: CityService){}

  @Mutation(() => City)
  @UseGuards(GqlAuthGuard, GraphQLRolesGuard)
  @Role(Roles.ADMIN)
  async createCity(@Args("data") createCityDto: CreateCityDto) {
    return this.cityService.createCity(createCityDto)
  }

  @Query(() => [City])
    async cities() {
    return this.cityService.getCities()
  }
}
