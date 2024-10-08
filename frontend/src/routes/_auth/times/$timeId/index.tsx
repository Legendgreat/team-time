import { createFileRoute } from "@tanstack/react-router"
import TimeView from "../../../../pages/Times/TimeView"

export const Route = createFileRoute("/_auth/times/$timeId/")({
  component: TimeView,
})
