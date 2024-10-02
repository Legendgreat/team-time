import { keyframes, Slide, Typography } from "@mui/material"
import React, { useState } from "react"

type Props = {
  time: number
  remain?: boolean
}

const transitionTiming = 200

const rollIn = keyframes`
  0% {
    transform: rotateX(90deg) translateZ(0.4rem)
  }
  100% {
    transform: rotateX(0deg) translateZ(0.4rem)
  }
`

const rollOut = keyframes`
  0% {
    transform: rotateX(0deg) translateZ(0.4rem)
  }
  100% {
    transform: rotateX(-90deg) translateZ(0.4rem)
  }
`

const Ticker = (props: Props) => {
  const { time, remain } = props
  const [remaining, setRemaining] = useState(time)

  return (
    <>
      <Typography
        sx={{
          display: "inline-block",
          animation: `${rollIn} 200ms forwards`,
        }}
        variant="h6"
      >
        {remaining}
      </Typography>
    </>
  )
}

export default Ticker
