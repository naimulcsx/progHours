import Layout from "@/components/dashboard/Layout"
import { Stats } from "../../components/dashboard/Stats"
import ProgressBox from "../../components/ProgressBox"
import { useQuery } from "react-query"
import { getStats } from "../../api/dashboard"
import calculatePoints from "../../utils/calculatePoints"

const DashboardHome = () => {
  const query = useQuery("stats", getStats)
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
          <ProgressBox progress={query.data} />
        </div>
      )}
      <div className="grid grid-cols-2 gap-8">
        <div className="px-8 py-6 bg-white border rounded-lg border-slate-100">
          <Stats />
        </div>
      </div>
    </Layout>
  )
}

export default DashboardHome
