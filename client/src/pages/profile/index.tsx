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
import { getUserByUsername } from "@/api/user"
import Spinner from "@/components/Spinner"
import { Transition } from "@headlessui/react"
import Avatar from "@/components/Avatar"

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
  const submissionQuery = useQuery(
    `submissions/${username}`,
    () => getSubmissionsByUsername(username ? username : "-1"),
    {
      retry: 1,
      onSuccess: (data) => {
        // setUser(data.user)
        setSubmissions(data.submissions)
      },
      onError: (err: AxiosError) => {
        navigate("/dashboard")
        showErrorToasts(err.response?.data.message)
      },
    }
  )

  const userQuery = useQuery(
    `profile/${username}`,
    () => getUserByUsername(username ? username : "-1"),
    {
      onSuccess: (user) => {
        setUser(user)
      },
    }
  )

  return (
    <div>
      <Navbar className="lg:bg-white" />
      <Transition
        show={[
          submissionQuery.isLoading,
          userQuery.isLoading,
          submissionQuery.isFetching,
          userQuery.isFetching,
        ].every((val) => val === false)}
        appear={true}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 scale-[0.995]"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100"
        leaveTo="opacity-0 scale-98"
      >
        <div className="relative flex items-center justify-center pt-32 pb-32 overflow-clip">
          <div className="space-y-6 text-center">
            <Avatar
              name={user?.name || ""}
              size="xl"
              className="mx-auto font-medium"
            />
            <h1 className="text-4xl">{user?.name}</h1>
            <span className="text-2xl">{user?.username}</span>
          </div>
        </div>
        <div className="container relative px-6 mx-auto -mt-16 space-y-16">
          {progressQuery.data && <ProgressBox progress={progressQuery.data} />}
        </div>
        <div className="container px-6 py-12 mx-auto space-y-8">
          <ProfileTable submissions={submissions} />
        </div>
        <MobileNav></MobileNav>
      </Transition>
    </div>
  )
}
