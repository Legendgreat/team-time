import { Time } from "../interfaces/time.interface"
import { query } from "./rootApi"

export const createTime = async (): Promise<Time> => {
  const data = await query<Time>(`/times`, {
    method: "post",
    body: { userId: 0 },
  })

  if (data) return data
  throw Error("Could not retrieve data.")
}

export const getTimes = async (): Promise<Time[]> => {
  const data = await query<Time[]>("/times", { method: "get" })

  if (data) return data
  throw Error("Could not retrieve data.")
}

export const getTimeById = async (id: number): Promise<Time> => {
  const data = await query<Time>(`/times/${id}`, { method: "get" })

  if (data) return data
  throw Error("Could not retrieve data.")
}

export const retractTime = async (id: number): Promise<Time> => {
  const data = await query<Time>(`/times/${id}`, {
    method: "put",
    body: { status: "draft" },
  })

  if (data) return data
  throw Error("Could not retrieve data.")
}

export const submitTime = async (id: number): Promise<Time> => {
  const data = await query<Time>(`/times/${id}`, {
    method: "put",
    body: { status: "pending" },
  })

  if (data) return data
  throw Error("Could not retrieve data.")
}

export const deleteTime = async (id: number): Promise<Time> => {
  const data = await query<Time>(`/times/${id}`, {
    method: "delete",
  })

  if (data) return data
  throw Error("Could not retrieve data.")
}
