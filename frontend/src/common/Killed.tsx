import { Delete } from "@mui/icons-material"
import { Container, Icon, Typography } from "@mui/material"
import { Link } from "@tanstack/react-router"
import React from "react"
import Ticker from "./Ticker"

type Props = {
  message: string
}

const Killed = (props: Props) => {
  const { message } = props

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
      <Typography variant="h5" sx={{ my: 2 }}>
        {message}
      </Typography>
      <Typography variant="h6" sx={{ my: 2 }}>
        Returning in <Ticker time={5} />
        ...
      </Typography>
      <Typography variant="h6">
        Click{" "}
        <Link to=".." activeOptions={{ exact: true }}>
          here
        </Link>{" "}
        to go back manually.
      </Typography>
    </Container>
  )
}

export default Killed
