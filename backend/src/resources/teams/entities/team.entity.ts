import { User } from 'src/resources/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  description?: string

  @ManyToOne(() => User, (user) => user.managesTeams, { nullable: true })
  manager?: User

  @ManyToMany(() => User, (user) => user.teams, { nullable: true })
  members?: User[]

  @Column({ default: true })
  enabled: boolean

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date

  @DeleteDateColumn()
  deletedAt?: Date
}
