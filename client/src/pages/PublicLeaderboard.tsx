import { getRankList } from "@/api/leaderboard"
import { AnimateLoading } from "@/components/AnimateLoading"
import { filterData } from "@/components/leaderboard/filters/filterData"
import { LeaderboardFilters } from "@/components/leaderboard/filters/Filters"
import LeaderboardTable from "@/components/leaderboard/Table"
import { PublicNavbar } from "@/components/navbar/PublicNavbar"
import { RanklistItem } from "@/types/RanklistItem"
import calculatePoints from "@/utils/calculatePoints"
import processRanklist from "@/utils/processRanklist"
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
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"

function PublicLeaderboard() {
  const [ranklist, setRanklist] = useState<any>(null)
  const [filteredData, setFilteredData] = useState<any>(null)

  useQuery("ranklist", getRankList, {
    onSuccess: (res) => {
      const { stats } = res.body
      const result = processRanklist(stats)
      setRanklist(result)
    },
  })

  const [filters, setFilters] = useState<any>({})

  useEffect(() => {
    if (Object.keys(filters).length > 0)
      setFilteredData(filterData(ranklist, filters))
    else setFilteredData(ranklist)
  }, [ranklist])

  useEffect(() => {
    if (Object.keys(filters).length > 0)
      setFilteredData(filterData(ranklist, filters))
    else setFilteredData(ranklist)
  }, [filters])

  return (
    <Box>
      {/* @ts-ignore */}
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <PublicNavbar />
      <Container pt={14}>
        <Box mt={6} mx={[0, 0, 0, 0, 0, 4]} pb={14}>
          <Heading size="lg" mx={[0, 0, 0, 0, 0, -4]} mb={2}>
            Leaderboard
          </Heading>
          <AnimateLoading isLoaded={filteredData}>
            {filteredData && (
              <>
                <Box mx={[0, -4]}>
                  <LeaderboardFilters
                    filters={filters}
                    setFilters={setFilters}
                  />
                </Box>
                <LeaderboardTable ranklist={filteredData} isPublic={true} />
              </>
            )}
          </AnimateLoading>
        </Box>
      </Container>
    </Box>
  )
}

export default PublicLeaderboard
