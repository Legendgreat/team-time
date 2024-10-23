import { Container } from "@mui/material"
import { useNavigate } from "@tanstack/react-router"
import AdminPanelCard from "./AdminPanelCard"

type Props = {}

const AdminPanel = (props: Props) => {
  const navigate = useNavigate()

  const buttons = [
    {
      label: "Manage Teams",
      onClick: () => {
        navigate({ to: "/admin/teams" })
      },
    },
  ]

  return (
    <Container sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
      {buttons.map((button) => (
        <AdminPanelCard label={button.label} onClick={button.onClick} />
      ))}
    </Container>
  )
}

export default AdminPanel
