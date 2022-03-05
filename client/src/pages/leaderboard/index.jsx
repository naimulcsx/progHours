import Layout from "@/components/dashboard/Layout"
import { Transition } from "@headlessui/react"
import { Fragment } from "react"
import { PlusIcon } from "../../components/Icons"
import LeaderboardTable from "../../components/leaderboard/Table"
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import axios from "axios"

function calculatePoints(obj) {
  const { avg_diffculty, solve_count, solve_time } = obj
  const x = avg_diffculty / 3000
  const y = solve_count / 50
  const z = solve_time / 100
  return (2 * x + y + z) / 4
}

const LeaderboardPage = () => {
  const query = useQuery(
    "ranklist",
    () => axios.get("/api/users/ranklist").then((res) => res.data),
    {
      onSuccess: (data) => {
        data.ranklist.forEach((el, i) => {
          data.ranklist[i].points = calculatePoints(el)
          el.points = calculatePoints(el) * 1000
        })
        data.ranklist.sort((a, b) => {
          return b.points - a.points
        })
      },
    }
  )
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h3 className="font-bold">
          <div className="flex items-center space-x-4">
            <span>Leaderboard</span>
            <Transition
              as={Fragment}
              show={query.status === "loading"}
              enter="transform transition duration-[400ms]"
              enterFrom="opacity-0 rotate-[-120deg] scale-50"
              enterTo="opacity-100 rotate-0 scale-100"
              leave="transform duration-200 transition ease-in-out"
              leaveFrom="opacity-100 rotate-0 scale-100 "
              leaveTo="opacity-0 scale-95 "
            >
              <div className="sp sp-circle sp-circle-dark"></div>
            </Transition>
          </div>
        </h3>
      </div>
      {query.status !== "loading" && (
        <div className="mt-6">
          <LeaderboardTable ranklist={query.data?.ranklist || []} />
        </div>
      )}
    </Layout>
  )
}

export default LeaderboardPage
