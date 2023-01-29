import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AddressModule } from './services/address/addres.module'; 
import { typeOrmAsyncConfig } from './config/typeorm.config'; 
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressResolver } from './resolvers/address/address.resolver';
import { UserModule } from './services/user/user.module';
import { UserResolver } from './resolvers/user/user.resolver';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthResolver } from './resolvers/auth/auth.resolver';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig), 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AddressModule,
    UserModule,
    AuthModule,
  ],
  providers: [AddressResolver, UserResolver, AuthResolver],
})
export class AppModule {}
