import React from "react"

interface BlockDefinition {
  label: string
  width: 4 | 6 | 12
  type?: undefined | "password" | "number"
}

interface PropsBase<T> {
  definition: BlockDefinition
  list: T[]
}

interface PropsSubmit {
  onSubmit: () => void
}

interface Props<T> extends PropsBase<T> {}
interface Props<T> extends PropsBase<T>, PropsSubmit {}

const BlockList = <T,>(props: Props<T & { id: number | string }>) => {
  return <div>BlockList</div>
}

export default BlockList
