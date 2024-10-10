import { BlockData } from 'src/resources/blocks/block.interface'

export type TimeStatus = 'approved' | 'denied' | 'draft' | 'pending'

export interface TimeData {
  user: number
  date: Date
  blocks: BlockData[]
  status: TimeStatus
  managerCommentary?: string
}
