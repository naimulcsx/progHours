import { createContext, ReactNode, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"

export type User = {
  id: number
  name: string
  role: string
  email: string
  username: string
  mobile?: string
  cgpa?: number
  batch?: number
  department?: string
  memberSince?: string
  section?: string
}

export const UserContext = createContext<
  { user: User | null | undefined } | undefined
>(undefined)

export const UserProvider = ({ children }: { children?: ReactNode }) => {
  const { pathname } = useLocation()
  const [user, setUser] = useState<User | null | undefined>(undefined)
  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((res) => setUser(res.data.body.user))
      .catch(() => setUser(null))
  }, [pathname])
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
