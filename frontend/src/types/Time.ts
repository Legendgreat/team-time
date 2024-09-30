export type TimeStatus = "draft" | "pending" | "approved" | "denied"

export type TimeType = {
  id: number
  uid: number
  date: Date
  blocks: {
    description: {
      short: string
      long?: string
    }
    duration: number
    start: number
  }[]
  status: TimeStatus
  managerCommentary: string
}
