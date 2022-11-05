import { useContext } from "react"
import { UserContext } from "~/contexts/UserContext"

function useUser() {
  const user = useContext(UserContext)
  if (user === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return user
}

export default useUser
