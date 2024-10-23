import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "@tanstack/react-router"
import { AxiosError } from "axios"
import React, { useState } from "react"
import { getTeamById } from "../../../api/teamApi"
import Error from "../../../common/Error/Error"
import Loader from "../../../common/Loader"
import PageHeader from "../../../common/PageHeader"
import { FetchError } from "../../../interfaces/error.interface"
import { Team } from "../../../interfaces/team.interface"
import AdminTeamCard from "./AdminTeamCard"

type Props = {}

const AdminTeamView = (props: Props) => {
  const navigate = useNavigate()
  const { teamId } = useParams({ strict: false })
  const {
    isPending,
    isError,
    data: initialTeam,
    error,
  } = useQuery({
    queryKey: ["team", { teamId }],
    queryFn: () => getTeamById(parseInt(teamId!)),
    throwOnError: (err: AxiosError & FetchError) => false,
  })

  const [team, setTeam] = useState<Team>()

  if (isPending) return <Loader />

  if (isError) return <Error error={error} />

  return (
    <Container sx={{ pt: 2 }}>
      <PageHeader
        onBack={() => {
          navigate({ to: ".." })
        }}
        content={teamId!}
      />
      <Box
        sx={{ pt: 4, px: 8, display: "flex", flexDirection: "column", gap: 4 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h5">Preview</Typography>
          <AdminTeamCard noClick {...{ ...initialTeam, ...team }} />
        </Box>
        <Divider flexItem />
        <Card variant="outlined">
          <CardContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 3, p: 2 }}
            >
              <TextField
                label="Name"
                size="small"
                value={team?.name !== undefined ? team?.name : initialTeam.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTeam((currentTeam) => ({
                    ...currentTeam!,
                    name: e.target.value,
                  }))
                }}
              ></TextField>
              <TextField
                label="Description"
                size="small"
                value={
                  team?.description !== undefined
                    ? team?.description
                    : initialTeam.description
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTeam((currentTeam) => ({
                    ...currentTeam!,
                    description: e.target.value,
                  }))
                }}
              ></TextField>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default AdminTeamView
