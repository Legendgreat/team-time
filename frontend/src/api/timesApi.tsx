import { Block, Time } from "../interfaces/time.interface"
import {
  sortTimeByBlockStart,
  sortTimesByBlockStart,
} from "../utils/sortingHelpers"
import { query } from "./rootApi"

const newBlock = {
  title: "",
  description: "",
  duration: 0,
  start: 0,
}

export const createTime = async (): Promise<Time> => {
  const data = await query<Time>(`/times`, {
    method: "post",
  })

  if (data) return data
  throw Error("Could not retrieve data.")
}

export const getTimes = async (): Promise<Time[]> => {
  const data = await query<Time[]>("/times", { method: "get" })

  const fData = sortTimesByBlockStart(data)

  if (data) return fData
  throw Error("Could not retrieve data.")
}

export const getTimeById = async (id: number): Promise<Time> => {
  const data = await query<Time>(`/times/${id}`, { method: "get" })

  const fData = sortTimeByBlockStart(data)

  if (data) return fData
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

export const createBlock = async (id: number): Promise<Time> => {
  const data = await query<Time>(`/times/${id}`, {
    method: "put",
    body: { blocks: [newBlock] },
  })

  if (data) return data
  throw Error("Could not retrieve data.")
}

export const updateBlocks = async (
  id: number,
  blocks: Block[]
): Promise<Block[]> => {
  const data = await query<Block[]>(`/times/${id}`, {
    method: "put",
    body: { blocks },
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

export const deleteBlock = async (
  timeId: number,
  id: number
): Promise<Time> => {
  const data = await query<Time>(`/times/${timeId}/block/${id}`, {
    method: "delete",
  })

  if (data) return data
  throw Error("Could not retrieve data.")
}
