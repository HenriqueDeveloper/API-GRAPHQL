import { Query, Resolver } from '@nestjs/graphql';
import { Address } from 'src/entities/address.entity';

@Resolver(() => Address)
export class AddressResolver {
    
    @Query(() => [Address])
    async addres() {
      return 'Hello World!';
    }
}
