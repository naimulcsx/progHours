import { getAllResources } from "@/api/resource"
import DashboardHeader from "@/components/dashboard/Header"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import { PlayIcon, TranslateIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"

interface Resource {
  title: string
  type: string
  language: string
  link: string
  difficulty: string
}

const ResourcesPage = () => {
  const [resources, setResources] = useState([])

  useQuery("resources", getAllResources, {
    onSuccess(data: any) {
      setResources(data?.resources)
    },
  })

  return (
    <DashboardLayout dataDependency={[]}>
      <Helmet>
        <title>Resources</title>
      </Helmet>
      <DashboardHeader title="Resources" />
      <div className="masonry-4-col">
        {resources.map((item) => (
          <ResourceCard key={item.id} {...item} />
        ))}
      </div>
    </DashboardLayout>
  )
}

function ResourceCard({ title, type, language, link, difficulty }: Resource) {
  return (
    <div className="pb-1 mb-3 break-inside">
      <div className="p-6 space-y-3 bg-white rounded-lg shadow">
        <h2 className="text-xl">{title}</h2>
        <div className="space-y-1 text-sm">
          <p className="flex space-x-1 text-gray-700 item-center">
            <span>Type:</span> <PlayIcon className="w-5 h-5" />
            <span>{type}</span>
          </p>
          <p className="flex space-x-1 text-gray-700 item-center">
            <span>Language:</span> <TranslateIcon className="w-5 h-5" />
            <span>{language}</span>
          </p>
        </div>
        <div className="flex justify-between font-medium text-gray-700">
          <a href={link} target="_blank" className="btn-primary-sm">
            View Resource
          </a>

          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((circle) => {
              const map = {
                Beginner: 1,
                Intermediate: 2,
                Advanced: 3,
              }

              while (circle <= map[difficulty]) {
                return (
                  <span
                    key={circle}
                    className="w-3 h-3 rounded-full bg-primary"
                  />
                )
              }
              return (
                <span
                  key={circle}
                  className="w-3 h-3 border-2 rounded-full border-primary"
                />
              )
            })}

            <span>{difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourcesPage
