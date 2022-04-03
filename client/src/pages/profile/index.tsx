import Navbar from "@/components/Navbar"
import ProgressBox from "@/components/ProgressBox"
import { GlobalContext } from "@/GlobalStateProvider"
import { useContext } from "react"
import { useQuery } from "react-query"
import { getStats } from "@/api/dashboard"

export default function Profile() {
  const { user } = useContext(GlobalContext)
  const query = useQuery("stats", getStats)
  return (
    <div className="">
      <Navbar />
      <div className="relative flex items-center justify-center pt-32 pb-16">
        <div className="space-y-6 text-center">
          <img
            src={`https://robohash.org/${user.name}?bgset=bg2&size=80x80`}
            alt={user.name}
            className="rounded-full mx-auto w-20 h-20"
          />
          <h1 className="text-4xl">{user.name}</h1>
          <span className="text-2xl">{user.username}</span>
        </div>
      </div>
      <div className="container mx-auto px-6">
        {query.data && <ProgressBox progress={query.data} />}
      </div>
      {/* tracking problem table */}
    </div>
  )
}
