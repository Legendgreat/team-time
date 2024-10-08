import { Block, Time } from "../interfaces/time.interface"

export const sortBlocksByStart = (blocks: Block[]): Block[] => {
  return blocks.sort((a, b) => a.start - b.start)
}

export const sortTimeByBlockStart = (time: Time): Time => {
  const fBlocks = time.blocks.sort((a, b) => a.start - b.start)

  return { ...time, blocks: fBlocks }
}

export const sortTimesByBlockStart = (times: Time[]): Time[] => {
  const fTimes: Time[] = []

  for (const time of times) {
    const fBlocks = time.blocks.sort((a, b) => a.start - b.start)
    fTimes.push({ ...time, blocks: fBlocks })
  }

  return fTimes
}
