import Layout from "@/components/dashboard/Layout"
import { Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import LeaderboardTable from "../../components/leaderboard/Table"
import { useQuery } from "react-query"
import axios from "axios"
import { getRankList } from "../../api/leaderBorad"

import calculatePoints from "../../utils/calculatePoints"
import Spinner from "@/components/Spinner"

const LeaderboardPage = () => {
  let [ranklist, setRanklist] = useState([])
  const query = useQuery("ranklist", () => getRankList(), {
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
