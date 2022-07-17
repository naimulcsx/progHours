import { useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { QueryClient, QueryClientProvider } from "react-query"
import { useLocation, useNavigate, useRoutes } from "react-router-dom"
import clearAuthData from "@/utils/clearAuthData"
import axios from "axios"
import { ReactQueryDevtools } from "react-query/devtools"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
import { ChakraProvider } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

/**
 * Import Styles
 */
import "@/styles/fonts.css"
import "@/styles/tailwind.css"
import "@/styles/spinner.css"
import { theme } from "@/styles/theme"

/**
 * Import Routes
 */
import routes from "./routes"

/**
 * Import Components
 */
import { GlobalStateProvider } from "./GlobalStateProvider"

/**
 * Initialize query client
 */
const queryClient = new QueryClient()

const App = (): JSX.Element => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  /**
   * Check if user has the appropiate cookie to access the private pages
   */
  useEffect(() => {
    async function checkUser() {
      try {
        await axios.get("/api/users/me")
      } catch (err) {
        await clearAuthData()
        navigate("/login")
        toast.error("Access denied", { className: "toast" })
      }
    }
    /**
     * Excluding /login and /register from checking since these are public pages
     */
    if (!["/login", "/register"].includes(pathname)) checkUser()
  }, [])

  const isLoggedIn: boolean = !!localStorage.getItem("isLoggedIn")
  const matchedPage = useRoutes(routes(isLoggedIn))

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Box minH="100vh" bg="gray.50">
            {isLoggedIn ? (
              <GlobalStateProvider>
                <main>{matchedPage}</main>
              </GlobalStateProvider>
            ) : (
              <main>{matchedPage}</main>
            )}
          </Box>
          {/* <ReactQueryDevtools position="bottom-right" /> */}
          <Toaster position="top-center" reverseOrder={false} />
        </HelmetProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
