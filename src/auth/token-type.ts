import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/entities/user.entity";

@ObjectType()
export class Token {
  @Field(() => String)
  token: string;
  @Field(() => User)
  user: User;

}