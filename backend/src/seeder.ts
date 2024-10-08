import { TypeOrmModule } from '@nestjs/typeorm'
import { seeder } from 'nestjs-seeder'
import { options } from './db/data-source'
import { User } from './users/user.entity'
import UserSeeder from './users/user.seeder'
import { Time } from './times/time.entity'
import { Block } from './blocks/block.entity'

seeder({
  imports: [
    TypeOrmModule.forRoot(options),
    TypeOrmModule.forFeature([User, Time, Block]),
  ],
}).run([UserSeeder])
