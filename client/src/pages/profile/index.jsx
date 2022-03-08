import Navbar from "@/components/Navbar"
import ProgressBox from "@/components/ProgressBox"
import { useQuery } from "react-query"
import { getStats } from "../../api/dashboard"

export default function Profile() {
  const name = localStorage.getItem("name")
  const query = useQuery("stats", getStats)
  return (
    <div className="">
      <Navbar bgWhite />
      <div className="relative flex items-center justify-center py-48 bg-primary">
        <div className="space-y-3 text-center">
          <h1 className="text-white">{name}</h1>
          <h3 className="text-white">C181065</h3>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="relative -top-20">
          {query.data && <ProgressBox progress={query.data} />}
        </div>
      </div>
      {/* tracking problem table */}
    </div>
  )
}
