import { createFileRoute, redirect } from "@tanstack/react-router"
import Times from "../../../pages/Times/Times"
import { Role } from "../../../enums/role.enum"

export const Route = createFileRoute("/_auth/times/")({
  beforeLoad: ({ context }) => {
    if (context.auth.user?.role === Role.Admin) {
      throw redirect({
        to: "/",
      })
    }
  },
  component: Times,
})
