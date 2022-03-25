import { createContext } from "react"
import useSubmissions from "@/hooks/useSubmissions"

const GlobalContext = createContext({})

const GlobalStateProvider = ({ children }) => {
  const submissionsData = useSubmissions()
  return (
    <GlobalContext.Provider
      value={{
        submissions: submissionsData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalStateProvider, GlobalContext }
