import { AuthReturn } from "../interfaces/auth.interface"
import { Time } from "../interfaces/time.interface"
import { User } from "../interfaces/user.interface"
import { sortTimesByBlockStart } from "../utils/sortingHelpers"
import { query } from "./rootApi"

export const login = async (userData: Partial<User>): Promise<AuthReturn> => {
  const data = await query<AuthReturn>(`/login`, {
    method: "post",
    body: {
      username: userData.username ?? undefined,
      email: userData.email ?? undefined,
      password: userData.password,
    },
  })

  if (data) return data
  throw Error("Could not retrieve data.")
}

export const logout = async (): Promise<Time[]> => {
  const data = await query<Time[]>("/times", { method: "get" })

  const fData = sortTimesByBlockStart(data)

  if (data) return fData
  throw Error("Could not retrieve data.")
}

export default { login, logout }
