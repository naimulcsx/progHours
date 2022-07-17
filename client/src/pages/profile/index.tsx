import {} from "axios"
import { useQuery } from "react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"
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
import { getSubmissionsByUsername } from "@/api/submissions"

/**
 * Import helpers
 */
import { getUserByUsername } from "@/api/user"
import { UserCard } from "@/components/profile/UserCard"
import { Helmet } from "react-helmet-async"
import { SubmissionsTable } from "@/components/submissions-table"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { getStatsByUsername } from "@/api/leaderboard"
import UserStats from "@/components/stats/UserStats"
import TagsFreqChart from "@/components/stats/visualizations/TagsFreqChart"
import { UserAbout } from "@/components/profile/UserAbout"
import { getWeekRanges } from "@/utils/getWeekRanges"
import WeeklySolvedChart from "@/components/stats/visualizations/WeeklySolvedChart"

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

interface Frequency {
  [name: string]: number
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
  let [frequency, setFrequency] = useState<Frequency | null>(null)

  const submissionQuery = useQuery(
    `submissions/${username}`,
    () => getSubmissionsByUsername(username ? username : "-1"),
    {
      onSuccess: (res) => {
        const frequency: Frequency = {}
        const weekRanges = getWeekRanges(res.body.submissions)
        /**
         * For each week k, calculate how many problems are solved in the k'th week
         */
        for (let i = 0; i < res.body.submissions.length; ++i) {
          for (let j = 0; j < weekRanges.length; ++j) {
            const solvedAt = new Date(res.body.submissions[i].solvedAt)
            if (
              solvedAt >= weekRanges[j].from &&
              solvedAt <= weekRanges[j].to
            ) {
              if (!frequency[j + 1]) frequency[j + 1] = 0
              frequency[j + 1]++
            }
          }
        }
        setFrequency(frequency)
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

  const [userStats, setUserStats] = useState<any>(null)
  useQuery(`stats/${username}`, () => getStatsByUsername(username || ""), {
    onSuccess: (res) => {
      setUserStats(res.body.stats)
    },
  })

  return (
    <>
      <Navbar />
      {user && userStats && frequency && submissionQuery.data ? (
        <Box>
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
                <TabPanel mx={-4}>
                  <Box mx={-4} mb={5} mt={2}>
                    <UserStats progress={userStats} />
                  </Box>
                  <UserAbout user={user} userStats={userStats} />
                </TabPanel>
                <TabPanel>
                  <Box
                    p={8}
                    pb={2}
                    mb={4}
                    bg="white"
                    rounded="lg"
                    shadow="base"
                    mx={-4}
                  >
                    <WeeklySolvedChart data={frequency} />
                  </Box>
                  <Box
                    p={8}
                    pb={2}
                    bg="white"
                    rounded="lg"
                    shadow="base"
                    mx={-4}
                  >
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
        </Box>
      ) : (
        <Container pt={20}>
          <Spinner size="sm" />
        </Container>
      )}
    </>
  )
}
