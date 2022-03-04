import Layout from "@/components/dashboard/Layout"
import { Stats } from "../../components/dashboard/Stats"

const DashboardHome = () => {
  return (
    <Layout>
      <div className="grid grid-cols-3">
        <div className="bg-white px-8 py-6 rounded-xl">
          <Stats />
        </div>
      </div>
    </Layout>
  )
}

export default DashboardHome
