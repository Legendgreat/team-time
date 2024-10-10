import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersService } from 'src/resources/users/users.service'
import { UsersModule } from 'src/resources/users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/resources/users/entities/user.entity'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth.guard'
import { RolesGuard } from '../roles/roles.guard'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '28d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
