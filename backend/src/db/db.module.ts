/*
https://docs.nestjs.com/modules
*/

import { TypeOrmModule } from '@nestjs/typeorm'
import { options } from './data-source'

export const DbModule = TypeOrmModule.forRoot(options)
