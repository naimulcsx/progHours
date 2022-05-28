import DashboardHeader from "@/components/dashboard/Header"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import { PlayIcon, TranslateIcon } from "@heroicons/react/solid"
import { Helmet } from "react-helmet-async"

const ResourcesPage = () => {
  return (
    <DashboardLayout dataDependency={[]}>
      <Helmet>
        <title>Resources</title>
      </Helmet>
      <DashboardHeader title="Resources" />
      <div className="masonry-4-col">
        <div className="pb-1 mb-3 break-inside">
          <div className="p-6 space-y-3 bg-white rounded-lg shadow">
            <h2 className="text-xl">Dynamic Programming</h2>
            <div className="space-y-1 text-sm">
              <p className="flex space-x-1 text-gray-700 item-center">
                <span>Type:</span> <PlayIcon className="w-5 h-5" />
                <span>Video</span>
              </p>
              <p className="flex space-x-1 text-gray-700 item-center">
                <span>Language:</span> <TranslateIcon className="w-5 h-5" />
                <span>English</span>
              </p>
            </div>
            <div className="flex justify-between font-medium text-gray-700">
              <button className="btn-primary-sm">View Resource</button>

              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="w-3 h-3 border-2 rounded-full border-primary"></span>
                <span className="w-3 h-3 border-2 rounded-full border-primary"></span>
                <span>Beginner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
export default ResourcesPage
