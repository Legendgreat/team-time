import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/times/$timeId/edit")({
  component: () => <div>Hello /times/$timeId/edit!</div>,
})
