import { createFileRoute, redirect } from "@tanstack/react-router"
import AdminTeams from "../../../../pages/Admin/Teams/AdminTeams"
import { Role } from "../../../../enums/role.enum"

export const Route = createFileRoute("/_auth/admin/teams/")({
  beforeLoad: ({ context }) => {
    if (context.auth.user?.role !== Role.Admin) {
      throw redirect({
        to: "/",
      })
    }
  },
  component: AdminTeams,
})
