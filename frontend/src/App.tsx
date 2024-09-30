import { createRouter, RouterProvider } from "@tanstack/react-router"
import React from "react"
import { routeTree } from "./routeTree.gen"

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      )

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
    </>
  )
}

export default App
