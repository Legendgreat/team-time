import { CircularProgress, Container } from "@mui/material"
import React from "react"

type Props = {}

const Loader = (props: Props) => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress size="10rem" />
    </Container>
  )
}

export default Loader
