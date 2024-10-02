import { ApiProperty } from '@nestjs/swagger'
import { TimeStatus } from '../time.interface'
import { Block } from '../../blocks/block.entity'

export class CreateTimeDto {
  @ApiProperty()
  userId: number
}
