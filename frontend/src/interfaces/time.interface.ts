export type TimeStatus = "draft" | "pending" | "approved" | "denied"

export interface Time {
  id: number
  userId: number
  date: number
  blocks: {
    title: string
    description: string
    duration: number
    start: number
  }[]
  status: TimeStatus
  managerCommentary: string
}

export interface NewTime {
  date: number
  status: TimeStatus
}
