import { DbModule } from './common/modules/db.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TimesModule } from './times/times.module'
import { DataSource } from 'typeorm'
@Module({
  imports: [DbModule, TimesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
