import { createRouter, RouterProvider } from "@tanstack/react-router"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { routeTree } from "./routeTree.gen"
import { useAuth } from "./auth/useAuth"
import React from "react"
import { IAuthContext } from "./auth/AuthProvider"
import { QueryClient } from "@tanstack/react-query"

export interface IRouterContext {
  auth: IAuthContext
  queryClient: QueryClient
}

const router = createRouter({
  routeTree,
  context: {
    // auth will initially be undefined
    // We'll be passing down the auth state from within a React component
    auth: undefined!,
    queryClient: undefined!,
  },
  defaultPreload: "intent",
})

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    )

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export const Router = () => {
  const auth = useAuth()
  return (
    <>
      <RouterProvider router={router} context={{ auth }} />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
      <TanStackRouterDevtools router={router} position="bottom-right" />
    </>
  )
}
