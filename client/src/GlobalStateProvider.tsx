import { createContext, ReactNode } from "react"

/**
 * Import hooks
 */
import useSubmissions from "@/hooks/useSubmissions"
import useUser from "@/hooks/useUser"

/**
 * Types for context
 */
export interface User {
  id: number
  name: string
  role: string
  email: string
  username: string
  mobile?: string
  cgpa?: number
  batch?: number
  department?: string
}

interface GlobalContext {
  user: User | null
  useSubmissionsResult: any
}

/**
 * Declare global context
 */
const GlobalContext = createContext<Partial<GlobalContext>>({})

const GlobalStateProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  const useSubmissionsResult = useSubmissions()
  const user: User | null = useUser()
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
