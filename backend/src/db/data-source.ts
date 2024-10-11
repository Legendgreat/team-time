import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config } from 'dotenv'
import { DataSourceOptions } from 'typeorm'

config()

export const options: DataSourceOptions & TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: 'db.sqlite',
  autoLoadEntities: true,
  synchronize: true,
}
