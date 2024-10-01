import { createFileRoute } from "@tanstack/react-router"
import TimeView from "../../../pages/Times/TimeView"

export const Route = createFileRoute("/times/$timeId/")({
  component: TimeView,
})
