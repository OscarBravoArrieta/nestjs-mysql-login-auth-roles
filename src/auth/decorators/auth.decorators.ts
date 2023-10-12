 import { UseGuards, applyDecorators} from '@nestjs/common'
 import { Role } from '../enums/rol.enum'
 import { Roles } from './roles.decorators'
 import { AuthGuard } from 'src/guards/auth/auth.guard'
 import { RolesGuard } from '../guard/roles.guard'

 export function Auth(role: Role) {
     return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard))
 }