import { Role } from 'src/guards/roles/role.enum'
import { Time } from 'src/resources/times/entities/time.entity'

export interface UserData {
  username: string
  email?: string
  password: string
  times?: Time[]
  role?: Role
  enabled?: boolean
}
