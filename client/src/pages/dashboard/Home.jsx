import Layout from "@/components/dashboard/Layout"
import { Stats } from "../../components/dashboard/Stats"

const DashboardHome = () => {
  const name = localStorage.getItem("name")
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold">Hi! {name} </h3>
          <p className="text-gray-500 mt-1">
            Here’s what’s going on in your competitive programming journey!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-6">
        <div className="bg-white px-8 py-6 border border-slate-100 rounded-lg">
          <Stats />
        </div>
      </div>
    </Layout>
  )
}

export default DashboardHome
