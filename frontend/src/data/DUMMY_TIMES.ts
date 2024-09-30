import { TimeType } from "../types/Time"

export const DUMMY_TIMES: TimeType[] = [
  {
    id: 0,
    uid: 0,
    date: new Date("2024-09-27"),
    blocks: [
      {
        description: {
          short: "Code",
          long: "Worked on project Team Time",
        },
        duration: 90,
        start: 540,
      },
      {
        description: {
          short: "Break",
        },
        duration: 90,
        start: 630,
      },
      {
        description: {
          short: "Code",
        },
        duration: 60,
        start: 720,
      },
      {
        description: {
          short: "Document",
          long: "Documented work on Team Time",
        },
        duration: 60,
        start: 780,
      },
    ],
    status: "pending",
    managerCommentary: "",
  },
  {
    id: 1,
    uid: 0,
    date: new Date("2024-09-23"),
    blocks: [
      {
        description: {
          short: "Break",
        },
        duration: 135,
        start: 540,
      },
    ],
    status: "approved",
    managerCommentary: "",
  },
]
