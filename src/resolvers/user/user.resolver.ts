import { Body, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Token } from 'src/types/token-type';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { CredentialsDto } from 'src/dtos/credentials.dto';
import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/services/auth/auth.service';
import { UsersService } from 'src/services/user/user.service';

@Resolver(() => User)
export class UserResolver {

  constructor(
    private userService: UsersService){}

  @Mutation(() => User) 
  async createAdminUser(@Args("data") createUserDto: CreateUserDto) {
    return this.userService.createAdminUser(createUserDto)
  }

  @Mutation(() => User) 
  async createCrientUser(@Args("data") createUserDto: CreateUserDto) {
    return this.userService.createClientUser(createUserDto)
  }

  @Mutation(() => User) 
  async createManagerUser(@Args("data") createUserDto: CreateUserDto) {
    return this.userService.createManagerUser(createUserDto)
  }

  @Query(() => [User])
  async users() {
    return this.userService.findAll()
  }

}
