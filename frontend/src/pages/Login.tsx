import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"
import React, { useState } from "react"
import { useRouteContext, useRouter } from "@tanstack/react-router"
import { useAuth } from "../auth/useAuth"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { reg } from "../utils/regex"

type Props = {}

const Login = (props: Props) => {
  const { auth } = useRouteContext({ from: "/_auth" })
  const router = useRouter()

  const [identifier, setIdentifier] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = React.useState(false)

  const handleIdentifierChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIdentifier(ev.target.value)
  }

  const handlePasswordChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(ev.target.value)
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleLogin = async (ev: React.FormEvent) => {
    ev.preventDefault()

    let username, email
    if (reg.email.test(identifier)) email = identifier
    else username = identifier

    await auth.login({ username, email, password })
    router.invalidate()
  }

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
      <Card sx={{ minWidth: 360 }}>
        <CardContent>
          <Box
            component="form"
            sx={{ display: "flex", gap: 2, flexDirection: "column" }}
            onSubmit={handleLogin}
          >
            <TextField
              label="Username / Email"
              size="small"
              value={identifier}
              onChange={handleIdentifierChange}
            />
            <FormControl size="small" variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                size="small"
                value={password}
                onChange={handlePasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button type="submit">Login</Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Login
