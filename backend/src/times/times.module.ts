/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'
import { TimesController } from './times.controller'
import { TimesService } from './times.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Time } from './entities/time.entity'
import { Block } from './blocks/block.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Time, Block])],
  controllers: [TimesController],
  providers: [TimesService],
})
export class TimesModule {}
