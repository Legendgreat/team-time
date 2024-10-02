/*
https://docs.nestjs.com/modules
*/

import { TypeOrmModule } from '@nestjs/typeorm'

export const DbModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'db',
  autoLoadEntities: true,
  synchronize: true,
})
