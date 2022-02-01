import { useNavigate, useRoutes } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { toast, ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"

// import routes
import routes from "./routes"
import "react-toastify/dist/ReactToastify.css"
import "./styles/tailwind.css"
import "./styles/spinner.css"

const queryClient = new QueryClient()

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const routing = useRoutes(routes(isLoggedIn))

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <div>{routing}</div>
        <ToastContainer theme="colored" autoClose={2000} position="bottom-right" />
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
