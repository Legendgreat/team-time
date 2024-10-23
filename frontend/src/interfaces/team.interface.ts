import { User } from "./user.interface"

export interface Team {
  id: number
  name: string
  description?: string
  image?: string
  manager?: Partial<User>
  members?: Partial<User>[]
}
