import { Container } from "@mui/material"
import { useNavigate } from "@tanstack/react-router"
import PageHeader from "../../common/PageHeader"

type Props = {}

const AdminTeams = (props: Props) => {
  const navigate = useNavigate()

  return (
    <Container sx={{ pt: 2 }}>
      <PageHeader
        content="Manage Teams"
        onBack={() => {
          navigate({ to: ".." })
        }}
      />
      <div></div>
    </Container>
  )
}

export default AdminTeams
