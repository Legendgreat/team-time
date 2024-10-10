import { TypeOrmModule } from '@nestjs/typeorm'
import { seeder } from 'nestjs-seeder'
import { options } from './db/data-source'
import { User } from './resources/users/entities/user.entity'
import UserSeeder from './resources/users/user.seeder'
import { Time } from './resources/times/entities/time.entity'
import { Block } from './resources/blocks/entities/block.entity'

seeder({
  imports: [
    TypeOrmModule.forRoot(options),
    TypeOrmModule.forFeature([User, Time, Block]),
  ],
}).run([UserSeeder])
