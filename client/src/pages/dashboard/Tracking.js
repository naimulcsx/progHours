import Dashboardlayout from "components/DashboardLayout"
import { GridViewIcon, ListViewIcon, PlusIcon } from "components/Icons"
import TrackingTable from "components/tracking/Table"
import { useQuery } from "react-query"
import { getSubmissions } from "api/submissions"
import { Link } from "react-router-dom"

export default function TrackingSheet() {
  const query = useQuery("practice", getSubmissions)
  return (
    <Dashboardlayout>
      {/* tracking table header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Tracking Sheet</h3>
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

      {/* tracking table */}
      {query.isSuccess && <TrackingTable problemData={query.data.data} />}
    </Dashboardlayout>
  )
}
