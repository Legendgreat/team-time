import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Router } from "./router"
import { AuthProvider } from "./auth/AuthProvider"

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
