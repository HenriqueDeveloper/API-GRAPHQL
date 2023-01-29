import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAddressDto {
  @Field(() => String)
  CEP: string;

  @Field(() => String)
  typeStreet: string;

  @Field(() => String)
  street: string;

  @Field(() => Number)
  number: number;

  @Field(() => String)
  complement: string;

  @Field(() => String)
  neighborhood: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  state: string;

  @Field(() => Boolean)
  streetSituation: boolean;
}
