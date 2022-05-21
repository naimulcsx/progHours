import { Fragment, useContext, useState } from "react"
import { useQuery } from "react-query"
import { Helmet } from "react-helmet-async"

/**
 * Import Components
 */
import { DashboardLayout } from "@/components/layouts/Dashboard"
import ProgressBox from "@/components/ProgressBox"
import VerdictChart from "@/components/dashboard/stats/VerdictChart"
import WeekChart from "@/components/dashboard/stats/WeekChart"
import { GlobalContext } from "@/GlobalStateProvider"

/**
 * Import helpers
 */
import { getStats } from "@/api/dashboard"
import { getSubmissions } from "@/api/submissions"
import { getWeekRanges } from "@/utils/getWeekRanges"
import { Transition } from "@headlessui/react"

const DashboardHome = () => {
  /**
   * Get statistics: number of problem solved, total solve time and average_difficulty
   */
  let [data, setData] = useState(null)
  useQuery("stats", getStats, {
    onSuccess: (data) => setData(data),
  })
  /**
   * Get submissions and get statistics for each week
   */
  interface Frequency {
    [name: string]: number
  }
  let [frequency, setFrequency] = useState<Frequency | null>(null)
  useQuery("practice", getSubmissions, {
    onSuccess: (data) => {
      const frequency: Frequency = {}
      const weekRanges = getWeekRanges(data.submissions)
      /**
       * For each week k, calculate how many problems are solved in the k'th week
       */
      for (let i = 0; i < data.submissions.length; ++i) {
        for (let j = 0; j < weekRanges.length; ++j) {
          const solved_at = new Date(data.submissions[i].solved_at)
          if (
            solved_at >= weekRanges[j].from &&
            solved_at <= weekRanges[j].to
          ) {
            if (!frequency[j + 1]) frequency[j + 1] = 0
            frequency[j + 1]++
          }
        }
      }
      setFrequency(frequency)
    },
  })

  /**
   * Get user's name from global state context
   */
  const { user } = useContext(GlobalContext)
  return (
    <DashboardLayout dataDependency={[user, data, frequency]}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/* <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold">Hi! {user?.name}</h3>
          <p className="mt-1 text-gray-500">
            Here&apos;s what&apos;s going on in your competitive programming
            journey!
          </p>
        </div>
      </div> */}
      <div className="space-y-4">
        {data && (
          <div className="">
            <ProgressBox progress={data} />
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="p-8 bg-white rounded-lg shadow xl:px-8 md:col-span-2">
            <WeekChart data={frequency} />
          </div>
          <div className="w-full h-full p-8 bg-white rounded-lg shadow xl:px-8 md:px-16 lg:px-32">
            <VerdictChart data={data} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardHome
