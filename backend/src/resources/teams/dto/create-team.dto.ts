import { ApiProperty } from '@nestjs/swagger'

export class CreateTeamDto {
  @ApiProperty()
  name: string

  @ApiProperty({ nullable: true })
  description?: string
}
