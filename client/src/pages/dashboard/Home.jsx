import Layout from "@/components/dashboard/Layout"
import { Stats } from "../../components/dashboard/Stats"

const DashboardHome = () => {
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
      <div className="grid grid-cols-3 mt-6">
        <div className="px-8 py-6 bg-white border rounded-lg border-slate-100">
          <Stats />
        </div>
      </div>
    </Layout>
  )
}

export default DashboardHome
