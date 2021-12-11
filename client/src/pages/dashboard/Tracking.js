import Dashboardlayout from "components/DashboardLayout"
import { GridViewIcon, ListViewIcon, PlusIcon } from "components/Icons"
import TrackingTable from "components/tracking/Table"

export default function TrackingSheet() {
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
            <button type="button" className="flex items-center btn-primary">
              <PlusIcon size={25} /> <span>New Entry</span>
            </button>
          </div>
        </div>
        {/* tracking table */}
        <TrackingTable />
      </div>
    </Dashboardlayout>
  )
}
