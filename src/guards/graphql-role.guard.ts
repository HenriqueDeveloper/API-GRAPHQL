import {
    Injectable,
    CanActivate,
    ExecutionContext,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Repository } from 'typeorm';
  import { User} from 'src/entities/user.entity';
  import { InjectRepository } from '@nestjs/typeorm';
import { GqlExecutionContext } from '@nestjs/graphql';
  
  @Injectable()
  export class GraphQLRolesGuard implements CanActivate {
    constructor(
      private readonly reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext) {
        const gqlContext = GqlExecutionContext.create(context);
        const req = gqlContext.getContext().req;
        const user = req.user
      const userRole = user.role;
      const requiredRole = this.reflector.get<string>(
        'role',
        context.getHandler(),
      );
  
      if (!requiredRole) return true;
  
      return userRole === requiredRole;
    }
  }
  