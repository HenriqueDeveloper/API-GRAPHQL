import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Token } from 'src/types/token-type';
import { CredentialsDto } from 'src/dtos/credentials.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Resolver(() => Token)
export class AuthResolver {
    constructor(private authService: AuthService){}

    @Mutation(() => Token) 
    async auth(@Args("data") credentiaslsDto: CredentialsDto) {
      return this.authService.signIn(credentiaslsDto)
    }
}
