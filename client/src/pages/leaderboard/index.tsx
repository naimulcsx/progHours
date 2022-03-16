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

const LeaderboardPage = () => {
  let [ranklist, setRanklist] = useState([])
  const query = useQuery("ranklist", getRankList, {
    onSuccess: (data) => {
      data.ranklist.forEach((el, i) => {
        el.points = calculatePoints(el).toFixed(2)
        el.avg_difficulty = el.avg_difficulty.toFixed(2)
      })
      data.ranklist.sort((a, b) => {
        return b.points - a.points
      })
      setRanklist(data.ranklist)
    },
  })
  return (
    <Layout>
      <Helmet>
        <title>Tracking Sheet</title>
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
          <LeaderboardTable ranklist={ranklist} />
        </div>
      </Transition>
    </Layout>
  )
}

export default LeaderboardPage
