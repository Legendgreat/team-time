import { createFileRoute } from "@tanstack/react-router"
import AdminTeams from "../../../pages/Admin/AdminTeams"

export const Route = createFileRoute("/_auth/admin/teams")({
  component: AdminTeams,
})
