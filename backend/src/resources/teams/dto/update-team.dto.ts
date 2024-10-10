import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateTeamDto } from './create-team.dto'
import { User } from 'src/resources/users/entities/user.entity'

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @ApiProperty()
  id: number

  @ApiProperty({ nullable: true })
  manager?: User

  @ApiProperty({ nullable: true })
  users?: User[]

  @ApiProperty({ nullable: true })
  status?: boolean
}
