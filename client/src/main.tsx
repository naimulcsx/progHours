import React from "react"
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"

/**
 * Import App
 */
import App from "@/App"

/**
 * Mount the app in the webpage
 */
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
