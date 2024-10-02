import { Container, Typography } from "@mui/material"
import { Link } from "@tanstack/react-router"
import { AxiosError } from "axios"
import { FetchError } from "../../interfaces/error.interface"

type Props = {
  error: AxiosError & FetchError
}

const Error = (props: Props) => {
  const { error } = props
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
      <Typography variant="h3">{error.status}</Typography>
      <Typography variant="h5" sx={{ my: 2 }}>
        {error.response.data.message}
      </Typography>
      <Typography variant="h5">
        Click{" "}
        <Link to=".." activeOptions={{ exact: true }}>
          here
        </Link>{" "}
        to go back.
      </Typography>
    </Container>
  )
}

export default Error
