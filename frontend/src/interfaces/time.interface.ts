export type TimeStatus = "draft" | "pending" | "approved" | "denied"

export interface Time {
  id: number
  userId: number
  date: number
  blocks: Block[]
  status: TimeStatus
  managerCommentary: string
}

export interface Block {
  title: string
  description: string
  duration: number
  start: number
}

export interface NewTime {
  date: number
  status: TimeStatus
}
