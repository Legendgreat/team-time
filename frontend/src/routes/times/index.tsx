import { createFileRoute } from "@tanstack/react-router"
import Times from "../../pages/Times/Times"

export const Route = createFileRoute("/times/")({
  component: Times,
})
