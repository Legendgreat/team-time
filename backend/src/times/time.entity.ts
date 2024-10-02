import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Block } from '../blocks/block.entity'
import { TimeStatus } from './time.interface'

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column({ default: Date.now() })
  date: Date

  @OneToMany(() => Block, (block) => block.time)
  blocks: Block[]

  @Column({ default: 'draft' })
  status: TimeStatus

  @Column({ nullable: true })
  managerCommentary?: string

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date

  @DeleteDateColumn()
  deletedAt?: Date
}
