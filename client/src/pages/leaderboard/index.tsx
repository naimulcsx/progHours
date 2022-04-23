import { Helmet } from "react-helmet-async"
import { Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { useQuery } from "react-query"

/**
 * Import Components
 */
import Layout from "@/components/dashboard/Layout"
import LeaderboardTable from "@/components/leaderboard/Table"
import Spinner from "@/components/Spinner"

/**
 * Import helpers
 */
import calculatePoints from "@/utils/calculatePoints"
import { getRankList } from "@/api/leaderboard"
import { RanklistItem } from "@/types/RanklistItem"

const LeaderboardPage = () => {
  let [ranklist, setRanklist] = useState(null)
  const query = useQuery("ranklist", getRankList, {
    onSuccess: (data) => {
      /**
       * Data is sent unsorted by the server
       * We need to caluclate the points
       */
      data.ranklist.forEach((el: RanklistItem) => {
        el.average_difficulty =
          el.total_difficulty / el.total_solved_with_difficulty || 0
        el.points = calculatePoints(el)
      })
      /**
       * Sort the array according to the points calculated
       * in the previous step and update the ranklist state
       */
      data.ranklist.sort((a: RanklistItem, b: RanklistItem) => {
        return b.points - a.points
      })
      setRanklist(data.ranklist)
    },
  })
  return (
    <Layout dataDependency={[ranklist]}>
      <Helmet>
        <title>Leaderboard</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <h3 className="font-bold">
          <div className="flex items-center space-x-4">
            <span>Leaderboard</span>
            <Spinner show={query.isLoading || query.isRefetching} />
          </div>
        </h3>
      </div>
      <Transition
        as={Fragment}
        show={!query.isRefetching && query.status !== "loading"}
        enter="transform transition duration-[300]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-300 transition ease-in-out"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0"
      >
        <div className="mt-6">
          {ranklist && <LeaderboardTable ranklist={ranklist} />}
        </div>
      </Transition>
    </Layout>
  )
}

export default LeaderboardPage
