import MenuIcon from "@mui/icons-material/Menu"
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material"
import { Link } from "@tanstack/react-router"
import { ReactNode, useState } from "react"
import {
  adminDrawerList,
  baseDrawerList,
  DrawerList,
  footerDrawerList,
  managerDrawerList,
  userDrawerList,
} from "../data/drawerLists"

type Props = {
  children?: ReactNode
}

const BasePage = (props: Props) => {
  const [open, setOpen] = useState(false)
  const role: number = 2

  const toggleDrawer = (newState: boolean | undefined = undefined) => {
    if (newState != undefined) {
      setOpen(newState)
    } else {
      setOpen(!open)
    }
  }

  const buildList = (list: DrawerList) => {
    return (
      <>
        {list.map((item) => {
          const itemLayout = (isActive: boolean) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={(theme) => ({
                backgroundColor: isActive
                  ? theme.palette.action.selected
                  : undefined,
              })}
            >
              <ListItemButton onClick={() => toggleDrawer(false)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          )

          if (!item.to) return itemLayout(false)

          return (
            <Link key={item.text} to={item.to} style={{ color: "inherit" }}>
              {({ isActive }) => itemLayout(isActive)}
            </Link>
          )
        })}
      </>
    )
  }

  return (
    <Paper sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <List>{buildList(baseDrawerList)}</List>
          {role > 1 && (
            <>
              <Divider>
                <Typography variant="caption">Manager</Typography>
              </Divider>
              <List>{buildList(managerDrawerList)}</List>
            </>
          )}
          {role < 3 && (
            <>
              <Divider>
                <Typography variant="caption">User</Typography>
              </Divider>
              <List>{buildList(userDrawerList)}</List>
            </>
          )}
          {role == 3 && (
            <>
              <Divider>
                <Typography variant="caption">Admin</Typography>
              </Divider>
              <List>{buildList(adminDrawerList)}</List>
            </>
          )}
          <Box sx={{ flexGrow: 1 }}></Box>
          <List>{buildList(footerDrawerList)}</List>
        </Box>
      </Drawer>
      <AppBar sx={{ position: "sticky" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Team Time
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1 }}>{props.children}</Box>
    </Paper>
  )
}

export default BasePage
