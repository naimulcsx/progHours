import Dashboardlayout from "components/DashboardLayout"
import { GridViewIcon, ListViewIcon, PlusIcon } from "components/Icons"
import TrackingTable from "components/tracking/Table"
import { useEffect, useState } from "react"
import axios from "axios"
import { useQuery } from "react-query"
import { getSubmissions } from "api/submissions"
import { Link } from "react-router-dom"

export default function TrackingSheet() {
  const [link, setLink] = useState("")
  const [verdict, setVerdict] = useState("")
  const [solveTime, setSolveTime] = useState(0)

  const query = useQuery("practice", getSubmissions)

  return (
    <Dashboardlayout>
      <div className="pt-28">
        {/* tracking table header */}
        <div className="flex items-center justify-between">
          <h3>Tracking Sheet</h3>
          <div className="flex items-center space-x-5">
            <div className="flex items-center text-primary">
              <div className="p-2 border border-r-0 border-lightGrey rounded-l-md">
                <GridViewIcon size={20} />
              </div>
              <div className="p-2 border border-lightGrey rounded-r-md">
                <ListViewIcon size={20} />
              </div>
            </div>
            <Link to="/submissions/new">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
                New Entry
              </button>
            </Link>
          </div>
        </div>
        <div>
          {/* temporary  */}
          {/* <form>
            <input
              type="text"
              placeholder="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <input
              type="text"
              placeholder="verdict"
              value={verdict}
              onChange={(e) => setVerdict(e.target.value)}
            />
            <input
              type="number"
              placeholder="solve time"
              value={solveTime}
              onChange={(e) => setSolveTime(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault()
                axios
                  .post("/api/practice", {
                    link,
                    verdict,
                    solveTime,
                  })
                  .then((res) => {
                    console.log(res)
                  })
              }}
            >
              Submit
            </button>
          </form> */}
        </div>
        {/* tracking table */}
        {query.isSuccess && <TrackingTable problemData={query.data.data} />}
      </div>
    </Dashboardlayout>
  )
}
