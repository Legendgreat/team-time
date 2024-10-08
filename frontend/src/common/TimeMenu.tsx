import React from "react"
import { Time } from "../interfaces/time.interface"
import { IconTypeMap, SvgIconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"

type Props = {
  time: Time
  date?: boolean
  duration?: boolean
  status?: boolean
  actions: {
    label: string
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string
    }
    callback: () => unknown
    disabled?: boolean
    show?: boolean
  }[]
}

const TimeMenu = (props: Props) => {
  return <div>TimeMenu</div>
}

export default TimeMenu
