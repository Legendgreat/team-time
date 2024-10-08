import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab"
import React from "react"
import {
  formatMinuteDurationToHourDisplay,
  formatMinuteDurationToString,
} from "../utils/timeHelpers"
import { Tooltip, Typography } from "@mui/material"
import { Time } from "../interfaces/time.interface"

type Props = {
  time: Time
}

const TimeTimeline = (props: Props) => {
  const { time } = props
  return (
    <Timeline sx={{ width: "auto" }}>
      {time.blocks.map((block, index) => (
        <TimelineItem key={block.start}>
          <TimelineOppositeContent variant="caption">
            <Tooltip
              placement="top"
              title={formatMinuteDurationToString(block.duration)}
            >
              <Typography component="span">
                {formatMinuteDurationToHourDisplay(block.start)}
              </Typography>
            </Tooltip>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            {index + 1 < time.blocks.length && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Tooltip placement="top" title={block.description}>
              <Typography component="span">{block.title}</Typography>
            </Tooltip>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

export default TimeTimeline
