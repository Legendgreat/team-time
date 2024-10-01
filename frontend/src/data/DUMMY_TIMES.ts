import { TimeType } from "../types/Time"

export const DUMMY_TIMES: TimeType[] = [
  {
    id: 0,
    userId: 0,
    date: new Date("2024-09-27").getTime(),
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
    userId: 0,
    date: new Date("2024-09-23").getTime(),
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
  {
    id: 2,
    userId: 0,
    date: new Date("2024-09-29").getTime(),
    blocks: [
      {
        description: {
          short: "Code",
        },
        duration: 60,
        start: 540,
      },
      {
        description: {
          short: "Break",
        },
        duration: 30,
        start: 600,
      },
      {
        description: {
          short: "Code",
          long: "Worked on project Team Time",
        },
        duration: 90,
        start: 630,
      },
    ],
    status: "denied",
    managerCommentary: "You didn't work on Team Time at 10:30am.",
  },
  {
    id: 3,
    userId: 1,
    date: new Date("2024-09-29").getTime(),
    blocks: [
      {
        description: {
          short: "Code",
        },
        duration: 60,
        start: 540,
      },
      {
        description: {
          short: "Break",
        },
        duration: 30,
        start: 600,
      },
      {
        description: {
          short: "Code",
          long: "Worked on project Team Time",
        },
        duration: 90,
        start: 630,
      },
    ],
    status: "denied",
    managerCommentary: "You didn't work on Team Time at 10:30am.",
  },
]
