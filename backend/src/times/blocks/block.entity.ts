import { UUID } from 'crypto'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Time } from '../entities/time.entity'

@Entity()
export class Block {
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @Column()
  timeId: UUID

  @Column()
  descShort: string

  @Column()
  descLong: string

  @Column()
  duration: number

  @Column()
  start: number

  @ManyToOne((type) => Time)
  @JoinColumn({ name: 'timeId', referencedColumnName: 'id' })
  time: Time
}
