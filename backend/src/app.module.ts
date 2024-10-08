import { AuthModule } from './guards/auth/auth.module'
import { UsersModule } from './users/users.module'
import { DbModule } from './db/db.module'
import { Module } from '@nestjs/common'
import { TimesModule } from './times/times.module'
import { DataSource } from 'typeorm'
@Module({
  imports: [AuthModule, UsersModule, DbModule, TimesModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
