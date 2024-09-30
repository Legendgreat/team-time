import { createRootRoute, Link } from "@tanstack/react-router"
import Root from "../components/Root"
import { Container, Typography } from "@mui/material"

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: () => {
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
        <Typography variant="h3">Oops!</Typography>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Looks like you went the wrong way, or the server had an oopsie.
        </Typography>
        <Typography variant="h5">
          Click{" "}
          <Link to="/" activeOptions={{ exact: true }}>
            here
          </Link>{" "}
          to go back to the dashboard.
        </Typography>
      </Container>
    )
  },
})
