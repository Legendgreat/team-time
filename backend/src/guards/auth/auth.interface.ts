import { User } from 'src/users/user.entity'

export interface IGetUserAuthInfoRequest extends Request {
  user: Partial<User>
}
