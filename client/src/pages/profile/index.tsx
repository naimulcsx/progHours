import MobileNav from "@/components/MobileNav"
import Navbar from "@/components/Navbar"
import ProgressBox from "@/components/ProgressBox"
import { GlobalContext } from "@/GlobalStateProvider"
import { useContext, useState } from "react"
import { useQuery } from "react-query"
import { getStats } from "@/api/dashboard"
import { getSubmissions } from "@/api/submissions"
import ProfileTable from "@/components/profile/Table"

export default function Profile() {
  const { user } = useContext(GlobalContext)
  const progressQuery = useQuery("stats", getStats)
  let [submissionList, setSubmissionList] = useState([])
  const query = useQuery("submissionList", getSubmissions, {
    onSuccess: (data) => {
      console.log(data.submissions)
      setSubmissionList(data.submissions)
    },
  })

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
      <div className="container mx-auto px-6 space-y-16">
        {progressQuery.data && <ProgressBox progress={progressQuery.data} />}
        <ProfileTable submissions={submissionList} />
      </div>
      <MobileNav></MobileNav>
      {/* tracking problem table */}
    </div>
  )
}
//        <ProfileTable submissionList={submissionList} />
