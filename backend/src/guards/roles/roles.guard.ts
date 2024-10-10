/*
https://docs.nestjs.com/guards#guards
*/

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from 'src/resources/users/entities/user.entity'
import { Role } from './role.enum'
import { ROLES_KEY } from './roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true
    }
    const { user } = context
      .switchToHttp()
      .getRequest<Partial<{ user: User }>>()

    return requiredRoles.some((role) => user.role === role)
  }
}
