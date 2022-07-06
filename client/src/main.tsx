import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"

/**
 * Import App
 */
import App from "@/App"

/**
 * Mount the app in the webpage
 */
const rootElement: any = document.getElementById("root")
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
