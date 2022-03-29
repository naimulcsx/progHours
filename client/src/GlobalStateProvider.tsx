import { createContext, ReactNode } from "react"
import useSubmissions from "@/hooks/useSubmissions"
import useUser from "@/hooks/useUser"

export interface User {
  name: string
  role: string
  email: string
  username: string
}

interface GlobalContext {
  user: User
}

const GlobalContext = createContext<GlobalContext>({
  user: {
    name: "",
    role: "",
    email: "",
    username: "",
  },
})

const GlobalStateProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  const useSubmissionsResult = useSubmissions()
  const user: User = useUser()
  return (
    <GlobalContext.Provider
      value={{
        useSubmissionsResult,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalStateProvider, GlobalContext }
