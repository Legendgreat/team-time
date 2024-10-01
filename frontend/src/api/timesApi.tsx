import { Time } from "../interfaces/time.interface"
import { query } from "./rootApi"

export const getTimes = async (userId: number): Promise<Time[]> => {
  const data = await query<Time[]>("get", "/times")

  if (data) return data
  throw Error("Could not retrieve data.")
}

export const getTimeById = async (
  userId: number,
  id: number
): Promise<Time> => {
  const data = await query<Time>("get", `/times/${id}`)

  if (data) return data
  throw Error("Could not retrieve data.")
}
