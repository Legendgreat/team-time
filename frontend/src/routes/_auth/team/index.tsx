import { createFileRoute, redirect } from "@tanstack/react-router"
import Team from "../../../pages/Team/Team"
import { Role } from "../../../enums/role.enum"

export const Route = createFileRoute("/_auth/team/")({
  beforeLoad: ({ context }) => {
    if (context.auth.user?.role === Role.User) {
      throw redirect({
        to: "/",
      })
    }
  },
  component: Team,
})
