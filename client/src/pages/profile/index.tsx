import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  Box,
  Container,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react"

/**
 * Import Components
 */
// import MobileNav from "@/components/MobileNav"
import Navbar from "@/components/navbar"
// import ProgressBox from "@/components/ProgressBox"
// import ProfileTable from "@/components/profile/Table"

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
import { GeneralInformationForm } from "@/components/settings/GeneralInformationForm"
import { UpdatePasswordForm } from "@/components/settings/UpdatePasswordForm"
import { getStatsByUsername } from "@/api/leaderboard"
import UserStats from "@/components/stats/UserStats"
import WeeklySolvedChart from "@/components/stats/visualizations/WeeklySolvedChart"
import TagsFreqChart from "@/components/stats/visualizations/TagsFreqChart"

interface User {
  name: string
  username: string
  email: string
  id: number
  memberSince: string
  department: string
  mobile: string
  batch: number
  role: string
}

export default function Profile() {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const { username } = useParams()

  /**
   * Get statistics
   */
  let [user, setUser] = useState<User | null>(null)
  let [submissions, setSubmissions] = useState([])

  /**
   * Get submissions
   */
  const submissionQuery = useQuery(
    `submissions/${username}`,
    () => getSubmissionsByUsername(username ? username : "-1"),
    {
      onSuccess: (res) => {
        // setUser(data.user)
        setSubmissions(res.body.submissions)
      },
    }
  )

  useQuery(
    `users/${username}`,
    () => getUserByUsername(username ? username : "-1"),
    {
      retry: 1,
      onSuccess: (res) => {
        setUser(res.body.user)
      },
      onError: (err) => {
        // showErrorToasts(toast, err.response?.data.message)
      },
    }
  )

  const [userStats, setUserStats] = useState(null)
  useQuery(`stats/${username}`, () => getStatsByUsername(username || ""), {
    onSuccess: (res) => {
      setUserStats(res.body.stats)
    },
  })

  return (
    <>
      <Navbar />
      {user && userStats && submissionQuery.data ? (
        <>
          <Helmet>
            <title>{user.name}</title>
          </Helmet>
          <UserCard
            name={user.name}
            username={user.username}
            member_since={user.memberSince}
          />
          <Container>
            <Tabs>
              <TabList>
                <Tab>About</Tab>
                <Tab>Statistics</Tab>
                <Tab>Submissions</Tab>
              </TabList>
              <TabPanels>
                <TabPanel mx={-4}>Hello world!</TabPanel>
                <TabPanel>
                  <Box mx={-4} mb={4}>
                    <UserStats progress={userStats} />
                  </Box>
                  <Box p={8} bg="white" rounded="lg" shadow="base" mx={-4}>
                    <TagsFreqChart data={userStats["tagsFrequency"]} />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box mx={-4}>
                    <SubmissionsTable submissions={submissions} />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>
        </>
      ) : (
        <Container pt={20}>
          <Spinner size="sm" />
        </Container>
      )}
    </>
  )
}
