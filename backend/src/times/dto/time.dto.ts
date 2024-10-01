import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'
import { TimeStatus } from '../entities/time.entity'
import { Block } from '../blocks/block.entity'

export class CreateTimeDto {
  @ApiProperty()
  id: UUID

  @ApiProperty()
  userId: number

  @ApiProperty()
  date: number

  @ApiProperty()
  blocks: Block[]

  @ApiProperty()
  status: TimeStatus

  @ApiProperty()
  managerCommentary?: string
}
