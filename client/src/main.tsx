import { createRoot } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"
import { HelmetProvider } from "react-helmet-async"

import { UserProvider } from "~/contexts/UserContext"

// react-query client
const client = new QueryClient()

// app
import App from "~/App"

// create root
const root = createRoot(document.getElementById("root") as HTMLElement)

// render
root.render(
  <HelmetProvider>
    <QueryClientProvider client={client}>
      <Router>
        <UserProvider>
          <App />
        </UserProvider>
      </Router>
    </QueryClientProvider>
  </HelmetProvider>
)
