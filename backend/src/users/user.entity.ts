import { Time } from '../times/time.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UUID } from 'crypto'
import { Role } from 'src/guards/roles/role.enum'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  fullName: string

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => Time, (time) => time.user)
  times: Time[]

  @Column({ default: 'user' })
  role: Role

  @Column({ default: true })
  enabled: boolean

  @Column({ nullable: true })
  lastLogin?: Date

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date

  @DeleteDateColumn()
  deletedAt?: Date
}
