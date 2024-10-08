import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/users/user.entity'

export class SignInDto {
  @ApiProperty()
  username: string

  @ApiProperty()
  password: string
}
