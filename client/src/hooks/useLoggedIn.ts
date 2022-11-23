import { useLocation } from "react-router-dom"
import { useQuery } from "react-query"
import axios from "axios"

const useLoggedIn = () => {
  const { pathname } = useLocation()
  const { isSuccess } = useQuery(
    ["user", pathname],
    () => axios.get("/api/users/me").then((res) => res.data),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  )
  return isSuccess
}

export default useLoggedIn
