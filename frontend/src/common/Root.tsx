import { ThemeProvider, useMediaQuery } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { Outlet } from "@tanstack/react-router"

import { darkTheme, lightTheme } from "../styles/themes"
import BasePage from "./BasePage"

const Root = () => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")

  const chooseTheme = () => {
    if (prefersDark) {
      return darkTheme
    } else {
      return lightTheme
    }
  }

  return (
    <>
      <ThemeProvider theme={chooseTheme()}>
        <CssBaseline />
        <BasePage>
          <Outlet />
        </BasePage>
      </ThemeProvider>
    </>
  )
}

export default Root
