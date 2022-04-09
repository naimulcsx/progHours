import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

/**
 * Import Components
 */
import MobileNav from "@/components/MobileNav"
import Navbar from "@/components/Navbar"
import ProgressBox from "@/components/ProgressBox"
import { GlobalContext } from "@/GlobalStateProvider"
import ProfileTable from "@/components/profile/Table"

/**
 * Import API
 */
import { getStats } from "@/api/dashboard"
import { getSubmissionsByUsername } from "@/api/submissions"

/**
 * Import helpers
 */
import showErrorToasts from "@/utils/showErrorToasts"

interface User {
  name?: string
  username?: string
  email?: string
  id?: number
}

export default function Profile() {
  // const { user } = useContext(GlobalContext)
  const { username } = useParams()
  const navigate = useNavigate()

  /**
   * Get statistics
   */
  const progressQuery = useQuery("stats", getStats)
  let [submissions, setSubmissions] = useState([])
  let [user, setUser] = useState<User>({})

  /**
   * Get submissions
   */
  useQuery(
    `submissions/${username}`,
    () => getSubmissionsByUsername(username ? username : "-1"),
    {
      retry: 1,
      onSuccess: (data) => {
        setUser(data.user)
        setSubmissions(data.submissions)
      },
      onError: (err: AxiosError) => {
        navigate("/dashboard")
        showErrorToasts(err.response?.data.message)
      },
    }
  )

  return (
    <div className="">
      <Navbar className="lg:bg-white" />
      <div className="relative flex items-center justify-center pt-32 pb-32 overflow-clip">
        <div className="space-y-6 text-center">
          <img
            src={`https://robohash.org/${user?.name}?bgset=bg2&size=160x160`}
            alt={user?.name}
            className={`rounded-full mx-auto ${user?.name ? "" : "opacity-0"}`}
          />
          <h1 className="text-4xl">{user?.name}</h1>
          <span className="text-2xl">{user?.username}</span>
        </div>
      </div>
      <div className="container mx-auto px-6 space-y-16 relative -mt-16">
        {progressQuery.data && <ProgressBox progress={progressQuery.data} />}
      </div>
      <div className="container mx-auto px-6 space-y-8 py-12">
        <ProfileTable submissions={submissions} />
      </div>
      <MobileNav></MobileNav>
    </div>
  )
}
