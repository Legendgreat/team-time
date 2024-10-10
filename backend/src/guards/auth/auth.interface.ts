import { User } from 'src/resources/users/entities/user.entity'

export interface IGetUserAuthInfoRequest extends Request {
  user: Partial<User>
}
