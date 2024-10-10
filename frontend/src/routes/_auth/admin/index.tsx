import { createFileRoute } from "@tanstack/react-router"
import AdminPanel from "../../../pages/Admin/AdminPanel"

export const Route = createFileRoute("/_auth/admin/")({
  component: AdminPanel,
})
