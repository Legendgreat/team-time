import { createFileRoute } from "@tanstack/react-router"
import AdminTeamView from "../../../../pages/Admin/Teams/AdminTeamView"

export const Route = createFileRoute("/_auth/admin/teams/$teamId")({
  component: AdminTeamView,
})
