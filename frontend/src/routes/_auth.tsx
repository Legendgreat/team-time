import { createFileRoute, Outlet } from "@tanstack/react-router"
import BasePage from "../common/BasePage"
import Login from "../pages/Login"

const Auth = () => {
  const { auth } = Route.useLoaderData()
  if (!auth.isAuthenticated) {
    return <Login />
  }
  return (
    <BasePage>
      <Outlet />
    </BasePage>
  )
}

export const Route = createFileRoute("/_auth")({
  loader: ({ context }) => {
    return context
  },
  component: Auth,
})
