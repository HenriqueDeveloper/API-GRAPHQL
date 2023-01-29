import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateAddressDto } from 'src/dtos/create-address.dto';
import { Address } from 'src/entities/address.entity';
import { AddressService } from 'src/services/address/address.service';

@Resolver(() => Address)
export class AddressResolver {
  constructor(
    private addressService: AddressService
  ) {}

  @Mutation(() => Address)
  async createAddress(@Args("data") createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto)
  }
    
  @Query(() => [Address])
  async addres() {
    return this.addressService.findAll();
  }
}
