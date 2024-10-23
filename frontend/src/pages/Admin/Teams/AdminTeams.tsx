import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Fab,
  List,
  ListItem,
  SpeedDial,
  Stack,
  Typography,
} from "@mui/material"
import { useNavigate, useRouter } from "@tanstack/react-router"
import PageHeader from "../../../common/PageHeader"
import { Team } from "../../../interfaces/team.interface"

import DeveloperImage from "../../../assets/rb_2123.png"
import DesignerImage from "../../../assets/rb_1825.png"
import AdminTeamCard from "./AdminTeamCard"
import { Add } from "@mui/icons-material"
import { useDialogs } from "@toolpad/core/useDialogs"
import CreateDialog, { Field } from "../../../common/Dialogs/CreateDialog"
import { createTeam, getTeams } from "../../../api/teamApi"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Loader from "../../../common/Loader"

// const teams: Team[] = [
//   {
//     id: 0,
//     name: "Dev Team",
//     image: DeveloperImage,
//     manager: {
//       fullName: "Mr. Dev",
//     },
//     members: [
//       {
//         fullName: "Dev Sr.",
//       },
//       {
//         fullName: "Dev Jr.",
//       },
//       {
//         fullName: "Dev Jr.",
//       },
//       {
//         fullName: "Dev Jr.",
//       },
//       {
//         fullName: "Dev Jr.",
//       },
//     ],
//   },
//   {
//     id: 1,
//     name: "Art Team",
//     image: DesignerImage,
//     manager: {
//       fullName: "Mr. Art",
//     },
//     members: [
//       {
//         fullName: "Art Sr.",
//       },
//       {
//         fullName: "Art Jr.",
//       },
//     ],
//   },
// ]

type Props = {}

const formFields: Field<Team>[] = [
  {
    label: "Name",
    type: "text",
    name: "name",
    width: 12,
  },
  {
    label: "Description",
    type: "text",
    name: "description",
    width: 12,
  },
]

const AdminTeams = (props: Props) => {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const dialogs = useDialogs()
  const {
    isPending,
    isError,
    data: teams,
    error,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: () => getTeams(),
  })

  const addTeam = (team: Partial<Team>) => {
    createTeam(team).then(() => {
      qc.invalidateQueries({ queryKey: ["teams"] })
    })
  }

  const handleAddTeam = () => {
    dialogs.open(CreateDialog<Team>, {
      title: "Team",
      formFields,
      onSubmit: addTeam,
    })
  }

  if (isPending) return <Loader />

  if (isError) return error

  return (
    <Container sx={{ pt: 2 }}>
      <PageHeader
        content="Manage Teams"
        onBack={() => {
          navigate({ to: ".." })
        }}
      />
      <Box display="flex" flexDirection="row" gap={2} p={2}>
        {teams.map((team) => (
          <AdminTeamCard key={team.id} {...team} />
        ))}
      </Box>
      <Fab
        onClick={handleAddTeam}
        color="primary"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <Add />
      </Fab>
    </Container>
  )
}

export default AdminTeams
