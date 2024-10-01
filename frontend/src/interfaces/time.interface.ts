export type TimeStatus = "draft" | "pending" | "approved" | "denied"

export interface Time {
  id: number
  userId: number
  date: number
  blocks: {
    descShort: string
    descLong: string
    duration: number
    start: number
  }[]
  status: TimeStatus
  managerCommentary: string
}
