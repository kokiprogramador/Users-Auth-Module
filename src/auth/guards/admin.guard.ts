import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserType } from '../../../generated/prisma/enums.js';
import { ADMIN_KEY } from '../decorators/admin.decorator.js';

@Injectable()
export class AdminsGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredUserTypes = this.reflector.getAllAndOverride<UserType[]>(ADMIN_KEY, [
      context.getHandler(), 
      context.getClass()
    ])
    const user = context.switchToHttp().getRequest().user;
    console.log(user)
    console.log(requiredUserTypes)
    const hasRequiredUserType = requiredUserTypes.some(type => user.type === type)
    return hasRequiredUserType;
  }
}
