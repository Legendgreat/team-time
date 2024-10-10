import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/resources/users/entities/user.entity'

export class CreateTimeDto {
  @ApiProperty()
  user: User
}
