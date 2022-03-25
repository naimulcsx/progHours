import { createContext, ReactNode } from "react"
import useSubmissions from "@/hooks/useSubmissions"

const GlobalContext = createContext({})

const GlobalStateProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  const useSubmissionsResult = useSubmissions()
  return (
    <GlobalContext.Provider
      value={{
        useSubmissionsResult,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalStateProvider, GlobalContext }
