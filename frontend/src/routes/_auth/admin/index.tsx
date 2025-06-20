import { createFileRoute, redirect } from "@tanstack/react-router"
import AdminPanel from "../../../pages/Admin/AdminPanel"
import { Role } from "../../../enums/role.enum"

export const Route = createFileRoute("/_auth/admin/")({
  beforeLoad: ({ context }) => {
    if (context.auth.user?.role !== Role.Admin) {
      throw redirect({
        to: "/",
      })
    }
  },
  component: AdminPanel,
})
