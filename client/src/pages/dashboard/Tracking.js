import Dashboardlayout from "components/DashboardLayout"
import { GridViewIcon, ListViewIcon, PlusIcon } from "components/Icons"

export default function TrackingSheet() {
  return (
    <Dashboardlayout>
      <div className="pt-20">
        <div className="flex items-center justify-between">
          <h3>Tracking Sheet</h3>
          <div className="flex items-center space-x-5">
            <div className="flex items-center text-primary">
              <div className="border p-2 border-borderColor border-r-0 rounded-l-md">
                <GridViewIcon size={20} />
              </div>
              <div className="border p-2 border-borderColor rounded-r-md">
                <ListViewIcon size={20} />
              </div>
            </div>
            <button type="button" className="btn-primary flex items-center">
              <PlusIcon size={25} /> <span>New Entry</span>
            </button>
          </div>
        </div>
      </div>
    </Dashboardlayout>
  )
}
