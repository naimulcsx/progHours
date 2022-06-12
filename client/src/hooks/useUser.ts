import { getUser } from "@/api/user"
import { useState } from "react"
import { useQuery } from "react-query"
import { User } from "@/GlobalStateProvider"

function useUser() {
  const [user, setUser] = useState<User | null>(null)
  useQuery("user", getUser, {
    onSuccess: (data) => setUser(data)
  })
  return user
}

export default useUser
