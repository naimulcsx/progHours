import { useEffect } from "react"
import { HelmetProvider } from "react-helmet-async"
import { QueryClient, QueryClientProvider } from "react-query"
import { useLocation, useNavigate, useRoutes } from "react-router-dom"
import clearAuthData from "@/utils/clearAuthData"
import axios from "axios"
import { ReactQueryDevtools } from "react-query/devtools"
import { useToast } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { useColorModeValue as mode } from "@chakra-ui/react"

/**
 * Import Styles
 */
import "@/styles/fonts.css"
import "@/styles/tailwind.css"
import "@/styles/spinner.css"

/**
 * Import Routes
 */
import routes from "./routes"

/**
 * Import Components
 */
import { GlobalStateProvider } from "./GlobalStateProvider"
import { DEFAULT_TOAST_OPTIONS } from "./configs/toast-config"

/**
 * Initialize query client
 */
const queryClient = new QueryClient()

const App = (): JSX.Element => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
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
        toast({ status: "error", title: "Access denied!" })
      }
    }
    /**
     * Excluding from checking since these are public pages
     */
    function userOrOtherPath(pathname: string) {
      return pathname.substring(0, 6) === "/users" ? "/users" : pathname
    }
    if (
      !["/", "/leaderboard", "/login", "/register", "/users"].includes(
        userOrOtherPath(pathname)
      )
    )
      checkUser()
  }, [])

  const isLoggedIn: boolean = !!localStorage.getItem("isLoggedIn")
  const matchedPage = useRoutes(routes(isLoggedIn))

  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-ignore */}
      <HelmetProvider>
        <Box minH="100vh" bg={mode("gray.50", "gray.900")}>
          {isLoggedIn ? (
            <GlobalStateProvider>
              <main>{matchedPage}</main>
            </GlobalStateProvider>
          ) : (
            <main>{matchedPage}</main>
          )}
        </Box>
        <ReactQueryDevtools position="bottom-right" />
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
