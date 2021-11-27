import { useRoutes } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import "./styles/App.css"

// import routes
import routes from "./routes"

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const routing = useRoutes(routes(isLoggedIn))
  return (
    <HelmetProvider>
      {routing} <ToastContainer />
    </HelmetProvider>
  )
}

export default App
