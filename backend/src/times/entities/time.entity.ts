import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UUID } from 'crypto'
import { Block } from '../blocks/block.entity'

export type TimeStatus = 'approved' | 'denied' | 'draft' | 'pending'

@Entity()
export class Time {
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @Column()
  userId: number

  @Column()
  date: number

  @OneToMany((type) => Block, (block) => block.timeId)
  blocks: Block[]

  @Column()
  status: TimeStatus

  @Column({ default: '' })
  managerCommentary?: string
}
