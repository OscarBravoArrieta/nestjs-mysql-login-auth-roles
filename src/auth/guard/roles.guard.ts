 import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
 import { Reflector } from '@nestjs/core'
 import { ROLES_KEY } from '../decorators/roles.decorators';
 import { Role } from '../enums/rol.enum';

 @Injectable()
 export class RolesGuard implements CanActivate {
     constructor(private readonly reflector: Reflector){}
     canActivate(
         context: ExecutionContext,
     ): boolean {
         const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
             context.getHandler()
         ])

         if (!role) {
             return true
         }

         const { user } = context.switchToHttp().getRequest()
         console.log(role)
         return role === user.role
    }
 }
