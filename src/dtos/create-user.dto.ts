import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserDto {
    @Field(() => String)
    email: string;
    @Field(() => String)
    cpf: string;
    @Field(() => String)
    name: string;
    @Field(() => String)
    idCity: string;
    @Field(() => String)
    password: string;
    @Field(() => String)
    passwordConfirmation: string;
}