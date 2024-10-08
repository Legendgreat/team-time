import { ThemeProvider, useMediaQuery } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { Outlet } from "@tanstack/react-router"
import { DialogsProvider } from "@toolpad/core/useDialogs"
import { SnackbarProvider } from "notistack"

import { darkTheme, lightTheme } from "../styles/themes"
import BasePage from "../common/BasePage"
import React from "react"

const Root = ({ children }: { children: React.ReactNode }) => {
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
        <DialogsProvider>
          <SnackbarProvider
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            autoHideDuration={2500}
          >
            <Outlet />
          </SnackbarProvider>
        </DialogsProvider>
      </ThemeProvider>
    </>
  )
}

export default Root
