import { createRoot } from "react-dom/client"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import App from "./App"
import "./index.css"
import { StrictMode } from "react"

const rootElement = document.getElementById("root")!

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
