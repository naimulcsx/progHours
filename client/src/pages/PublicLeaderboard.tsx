import { getRankList } from "@/api/leaderboard"
import { AnimateLoading } from "@/components/AnimateLoading"
import LeaderboardTable from "@/components/leaderboard/Table"
import { PublicNavbar } from "@/components/navbar/PublicNavbar"
import { RanklistItem } from "@/types/RanklistItem"
import calculatePoints from "@/utils/calculatePoints"
import {
  Box,
  Container,
  Heading,
  Skeleton,
  Spinner,
  Stack,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"

function PublicLeaderboard() {
  const [ranklist, setRanklist] = useState(null)
  useQuery("ranklist", getRankList, {
    onSuccess: async (res) => {
      const { stats } = res.body
      /**
       * Data is sent unsorted by the server
       * We need to caluclate the points
       */
      stats.forEach((el: RanklistItem) => {
        el.averageDifficulty =
          el.totalDifficulty / el.totalSolvedWithDifficulty || 0
        el.points = calculatePoints(el)
      })
      /**
       * Sort the array according to the points calculated
       * in the previous step and update the ranklist state
       */
      stats.sort((a: RanklistItem, b: RanklistItem) => {
        return b.points - a.points
      })
      setRanklist(stats)
    },
  })
  return (
    <Box>
      {/* @ts-ignore */}
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <PublicNavbar />
      <Container pt={14}>
        <Box mt={6} mx={[0, 0, 0, 0, 0, 4]}>
          <Heading size="lg" mx={[0, 0, 0, 0, 0, -4]} mb={4}>
            Leaderboard
          </Heading>
          <AnimateLoading
            isLoaded={ranklist}
            SkeletonComponent={() => {
              return (
                <Stack mx={-4}>
                  <Skeleton height="24px" />
                  <Skeleton height="24px" />
                  <Skeleton height="24px" />
                  <Skeleton height="24px" />
                </Stack>
              )
            }}
          >
            {ranklist && <LeaderboardTable ranklist={ranklist} />}
          </AnimateLoading>
        </Box>
      </Container>
    </Box>
  )
}

export default PublicLeaderboard
