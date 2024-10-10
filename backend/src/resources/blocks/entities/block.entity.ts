import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Time } from 'src/resources/times/entities/time.entity'

@Entity()
export class Block {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ nullable: true })
  description?: string

  @Column()
  duration: number

  @Column()
  start: number

  @ManyToOne(() => Time)
  @JoinColumn({ name: 'time' })
  time: Time

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date

  @DeleteDateColumn()
  deletedAt?: Date
}
