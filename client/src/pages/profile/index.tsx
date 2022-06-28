import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, useToast } from "@chakra-ui/react"

/**
 * Import Components
 */
import MobileNav from "@/components/MobileNav"
import Navbar from "@/components/navbar"
import ProgressBox from "@/components/ProgressBox"
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
import { UserCard } from "@/components/profile/UserCard"
import { Helmet } from "react-helmet-async"
import { SubmissionsTable } from "@/components/submissions-table"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"

interface User {
  name?: string
  username?: string
  email?: string
  id?: number
  member_since?: string
}

export default function Profile() {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  // const { user } = useContext(GlobalContext)
  const { username } = useParams()
  const navigate = useNavigate()

  /**
   * Get statistics
   */
  let [user, setUser] = useState<User>({})
  const progressQuery = useQuery("stats", getStats)
  let [submissions, setSubmissions] = useState([])

  /**
   * Get submissions
   */
  const submissionQuery = useQuery(
    `submissions/${username}`,
    () => getSubmissionsByUsername(username ? username : "-1"),
    {
      onSuccess: (data) => {
        // setUser(data.user)
        setSubmissions(data.submissions)
      },
    }
  )

  const userQuery = useQuery(
    `users/${username}`,
    () => getUserByUsername(username ? username : "-1"),
    {
      retry: 1,
      onSuccess: (user) => {
        setUser(user)
      },
      onError: (err) => {
        showErrorToasts(toast, err.response?.data.message)
      },
    }
  )
  return (
    <>
      <Navbar />
      {Object.keys(user).length && submissionQuery.data ? (
        <>
          <Helmet>
            <title>{user.name}</title>
          </Helmet>
          <UserCard
            name={user.name!}
            username={user.username!}
            member_since={user.member_since!}
          />
          <Container>
            <SubmissionsTable submissions={submissions} />
          </Container>
        </>
      ) : null}
    </>
  )
}
