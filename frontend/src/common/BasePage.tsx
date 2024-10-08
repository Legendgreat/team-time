import { Box, Paper } from "@mui/material"
import { useRouteContext, useRouter } from "@tanstack/react-router"
import { ReactNode, useEffect, useState } from "react"
import { useAuth } from "../auth/useAuth"
import Navigation from "./Navigation"
import { Role } from "../enums/role.enum"

type Props = {
  children?: ReactNode
}

const BasePage = (props: Props) => {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<Role | null>(null)
  const router = useRouter()
  const { auth } = useRouteContext({ from: "/_auth" })

  const toggleDrawer = (newState: boolean | undefined = undefined) => {
    if (newState != undefined) {
      setOpen(newState)
    } else {
      setOpen(!open)
    }
  }

  useEffect(() => {
    if (auth.user) {
      setRole(auth.user.role)
    }
  }, [auth.user])

  return (
    <Paper
      sx={{ display: "flex", flexDirection: "column", height: "100%", pb: 4 }}
    >
      {auth.isAuthenticated && role !== null && (
        <Navigation
          toggleDrawer={toggleDrawer}
          open={open}
          role={role}
          onLogout={() => {
            auth.logout()
            router.invalidate()
          }}
        />
      )}
      <Box sx={{ flexGrow: 1, position: "relative" }}>{props.children}</Box>
    </Paper>
  )
}

export default BasePage
