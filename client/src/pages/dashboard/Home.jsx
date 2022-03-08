import Layout from "@/components/dashboard/Layout"
import ProgressBox from "../../components/ProgressBox"
import { useQuery } from "react-query"
import { getStats } from "../../api/dashboard"
import { VerdictChart } from "../../components/dashboard/stats/VerdictChart"
import WeekChart from "../../components/dashboard/stats/WeekChart"
import { useState } from "react"
import { getSubmissions } from "../../api/submissions"
import getWeekRanges from "../../utils/getWeekRanges"

const DashboardHome = () => {
  let [data, setData] = useState(null)
  let [frequency, setFrequency] = useState(null)
  const query = useQuery("stats", getStats, {
    onSuccess: (data) => setData(data),
  })
  useQuery("practice", getSubmissions, {
    onSuccess: (data) => {
      const frequency = {}
      const weekRanges = getWeekRanges(data.submissions)
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
  const name = localStorage.getItem("name")
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold">Hi! {name}</h3>
          <p className="mt-1 text-gray-500">
            Here&apos;s what&apos;s going on in your competitive programming
            journey!
          </p>
        </div>
      </div>
      {query.status !== "loading" && (
        <div className="my-8">
          <ProgressBox progress={data} />
        </div>
      )}
      <div className="grid grid-cols-4 gap-8">
        <div className="h-full w-full px-8 py-6 bg-white shadow shadow-primary/5 rounded-lg">
          <VerdictChart data={data} />
        </div>
        <div className="px-8 py-6 bg-white  rounded-lg shadow shadow-primary/5 col-span-2">
          <WeekChart data={frequency} />
        </div>
      </div>
    </Layout>
  )
}

export default DashboardHome
