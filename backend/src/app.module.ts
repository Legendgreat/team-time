import { TeamsModule } from './resources/teams/teams.module'
import { AuthModule } from './guards/auth/auth.module'
import { UsersModule } from './resources/users/users.module'
import { DbModule } from './db/db.module'
import { Module } from '@nestjs/common'
import { TimesModule } from './resources/times/times.module'
import { DataSource } from 'typeorm'
@Module({
  imports: [TeamsModule, AuthModule, UsersModule, DbModule, TimesModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
