import { ApiProperty } from '@nestjs/swagger'

export class CreateBlockDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty()
  duration: number

  @ApiProperty()
  start: number
}
