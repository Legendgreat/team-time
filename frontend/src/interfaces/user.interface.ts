import { Role } from "../enums/role.enum"
import { Time } from "./time.interface"

export interface User {
  id: number
  username: string
  fullName: string
  email: string
  password: string
  times: Time[]
  role: Role
  enabled: boolean
  lastLogin?: Date
}
