 import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
 import { UsersService } from 'src/users/users.service'
 import { RegisterDto } from './dto/register.dto'
 import * as bcryptjs from 'bcryptjs'
 import { LoginDto } from './dto/login.dto'
 import { JwtService } from '@nestjs/jwt'

 @Injectable()
 export class AuthService {
     constructor(
         private readonly userService: UsersService,
         private readonly jwtService: JwtService
     ){
         
     }
     async register({name, email, password}: RegisterDto) {
         const user = await this.userService.finOneByEmail(email)
         if (user) {
             throw new BadRequestException('Usuario already exist')
         }
         await this.userService.create({
             name, 
             email, 
             password: await bcryptjs.hash(password, 10)
         })
         return {
             name,
             email
         }
     }
     async login({email, password}: LoginDto){
         const user = await this.userService.finOneByEmail(email)
         if(!user) {
             throw new UnauthorizedException('email is wrong')
         }

         const isPasswordValid = await bcryptjs.compare(password, user.password)
         if(!isPasswordValid) {
             throw new UnauthorizedException('Password is wrong')
         }

         const payload = 
             { 
                 email: user.email,
                 idUser: user.id,
                 role: user.role
             }

         const token = await this.jwtService.signAsync(payload)
         return {
             token,
             email,
         }
     }
     async profile({email, role}: {email: string, role: string}) {
        //  if (role !== 'admin') {
        //      throw new UnauthorizedException(
        //          'You are not autjorized to acces this resource'
        //      )
        //  }
         return await this.userService.finOneByEmail(email)
     }
 }
