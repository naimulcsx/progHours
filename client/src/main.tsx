import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "@/styles/theme"
import { ColorModeScript } from "@chakra-ui/react"

/**
 * Import App
 */
import App from "@/App"

/**
 * Mount the app in the webpage
 */
ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </React.StrictMode>
  </>,
  document.getElementById("root")
)
