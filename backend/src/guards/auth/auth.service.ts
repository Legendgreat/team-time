/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/resources/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username)
    if (!user) {
      throw new UnauthorizedException()
    }
    if (!bcrypt.compare(user?.password, password)) {
      throw new UnauthorizedException()
    }
    const payload = { ...user }
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
      user: JSON.stringify({
        ...user,
        password: undefined,
        created: undefined,
        updated: undefined,
        deletedAt: undefined,
      }),
    }
  }
}
