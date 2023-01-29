import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from 'src/dtos/create-address.dto';
import { Address } from 'src/entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private repository: Repository<Address>,
  ) {}
  
  async create(createAddressDto: CreateAddressDto): Promise<Address> {

    const address = new Address();

    address.CEP = createAddressDto.CEP;
    address.city = createAddressDto.city;
    address.complement = createAddressDto.complement;
    address.neighborhood = createAddressDto.neighborhood;
    address.state = createAddressDto.state;
    address.street = createAddressDto.street;
    address.streetSituation = createAddressDto.streetSituation;
    address.typeStreet = createAddressDto.typeStreet;
    address.number = createAddressDto.number;

    await this.repository.save(address);

    return address;
  }

  findAll() {
    return this.repository.find();
  }

}
