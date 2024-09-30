import { ReactNode } from "react"
import {
  Logout,
  House,
  WatchLater,
  Done,
  Engineering,
} from "@mui/icons-material"

export type DrawerList = {
  text: string
  icon?: ReactNode
  to?: string
}[]

export const baseDrawerList: DrawerList = [
  {
    text: "Dashboard",
    icon: <House />,
    to: "/",
  },
]

export const managerDrawerList: DrawerList = [
  {
    text: "Manage Team",
    icon: <Done />,
    to: "/team",
  },
]

export const userDrawerList: DrawerList = [
  {
    text: "Times",
    icon: <WatchLater />,
    to: "/times",
  },
]

export const adminDrawerList: DrawerList = [
  {
    text: "Administration",
    icon: <Engineering />,
    to: "/admin",
  },
]

export const footerDrawerList: DrawerList = [
  {
    text: "Logout",
    icon: <Logout />,
  },
]
