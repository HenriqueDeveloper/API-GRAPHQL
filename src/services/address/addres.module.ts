import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { AddressResolver } from 'src/resolvers/address/address.resolver';
import { AddressService } from 'src/services/address/address.service'; 

@Module({
    imports: [
      TypeOrmModule.forFeature([Address]),
    ],
    controllers: [],
    providers: [AddressService, AddressResolver],
    exports: [AddressService, AddressResolver]
  })
export class AddressModule {

}
