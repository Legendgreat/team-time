import { Menu } from "@mui/icons-material"
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
  Toolbar,
  Typography,
} from "@mui/material"
import { Link } from "@tanstack/react-router"
import {
  adminDrawerList,
  baseDrawerList,
  DrawerList,
  footerDrawerList,
  managerDrawerList,
  userDrawerList,
} from "../data/drawerLists"
import { Role } from "../enums/role.enum"

type Props = {
  open: boolean
  toggleDrawer: (state: boolean) => void
  role: Role
  onLogout: () => void
}

const Navigation = (props: Props) => {
  const { open, toggleDrawer, role, onLogout } = props

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
              <ListItemButton
                onClick={() => {
                  toggleDrawer(false)
                  if (item.logout) {
                    onLogout()
                  }
                }}
              >
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
    <>
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
          {(role === Role.Manager || role === Role.Admin) && (
            <>
              <Divider>
                <Typography variant="caption">Manager</Typography>
              </Divider>
              <List>{buildList(managerDrawerList)}</List>
            </>
          )}
          {(role === Role.User || role === Role.Manager) && (
            <>
              <Divider>
                <Typography variant="caption">User</Typography>
              </Divider>
              <List>{buildList(userDrawerList)}</List>
            </>
          )}
          {role === Role.Admin && (
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
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div">
            Team Time
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navigation
