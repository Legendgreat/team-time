import { ApiProperty } from '@nestjs/swagger'
import { TimeStatus } from '../../times/time.interface'
import { Time } from 'src/resources/times/entities/time.entity'
import { Role } from 'src/guards/roles/role.enum'

export class CreateUserDto {
  @ApiProperty()
  username: string

  @ApiProperty({ nullable: true })
  email?: string

  @ApiProperty()
  password: string

  @ApiProperty({ nullable: true })
  times?: Time[]

  @ApiProperty({ default: 'user' })
  role?: Role

  @ApiProperty({ default: true })
  enabled?: boolean
}
