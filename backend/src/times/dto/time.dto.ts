import { ApiProperty } from '@nestjs/swagger'
import { TimeStatus } from '../time.interface'
import { Block } from '../../blocks/block.entity'
import { User } from 'src/users/user.entity'

export class CreateTimeDto {
  @ApiProperty()
  user: User
}
