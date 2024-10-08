import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Block } from '../blocks/block.entity'
import { TimeStatus } from './time.interface'
import { User } from '../users/user.entity'

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  user: User

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
