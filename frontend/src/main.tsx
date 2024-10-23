import { createRoot } from "react-dom/client"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import App from "./App"
import "./index.css"
import { StrictMode } from "react"
import axios from "axios"

if (import.meta.env.DEV) {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL
  console.log("[VITE_API_URL]", import.meta.env.VITE_API_URL)
} else {
  axios.defaults.baseURL = "https://legendigi.com/api"
}

const rootElement = document.getElementById("root")!

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
