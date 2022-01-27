import { useRoutes } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from "react-query"
const queryClient = new QueryClient()

import "react-toastify/dist/ReactToastify.css"
import "styles/tailwind.css"

// import routes
import routes from "./routes"

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const routing = useRoutes(routes(isLoggedIn))
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        {routing} <ToastContainer theme="colored" autoClose={2000} />
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
