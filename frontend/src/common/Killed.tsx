import { Delete } from "@mui/icons-material"
import { Box, Container, Icon, Stack, Typography, useTheme } from "@mui/material"
import { Link } from "@tanstack/react-router"
import React, { useEffect, useState } from "react"
import FlipNumbers from "react-flip-numbers"

type Props = {
  message: string
  onCancelTimeout: () => void
}

const Killed = (props: Props) => {
  const { message, onCancelTimeout } = props

  const [time, setTime] = useState(5)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(oldTime => oldTime - 1)
    }, 1000)
    if (time == 0) clearInterval(interval)
    return () => clearInterval(interval)
  }, [time])

  const theme = useTheme();

  

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon sx={{ fontSize: "8rem" }}>
        <Delete sx={{ fontSize: "inherit" }} />{" "}
      </Icon>
      <Typography variant="h5">
        {message}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2}}>
        <Typography variant="h6" sx={{mr: 1}}>
          Returning in
        </Typography>
        <FlipNumbers numberStyle={{fontWeight: "bold", WebkitFontSmoothing: 'subpixel-antialiased'}} duration={0.2} height={20} width={20} play color={theme.palette.text.primary} perspective={200} numbers={time.toString()} />
        {time === 0 && 
          <Typography variant="h6">
            ...
          </Typography>
        }
      </Box>
      <Typography variant="h6">
        Click{" "}
        <Link onClick={onCancelTimeout} to=".." activeOptions={{ exact: true }}>
          here
        </Link>{" "}
        to go back manually.
      </Typography>
    </Container>
  )
}

export default Killed
