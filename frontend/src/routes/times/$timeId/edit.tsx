import { createFileRoute } from "@tanstack/react-router"
import TimeEdit from "../../../pages/Times/TimeEdit"

export const Route = createFileRoute("/times/$timeId/edit")({
  component: TimeEdit
})
