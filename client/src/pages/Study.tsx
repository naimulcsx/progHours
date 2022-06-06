import DashboardHeader from "@/components/dashboard/Header"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import PopupBuilder from "@/components/PopupBuilder"
import StudyForm from "@/components/study/StudyForm"
import { PlusIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { Helmet } from "react-helmet-async"

const StudyPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DashboardLayout dataDependency={[]}>
      <Helmet>
        <title>Study List</title>
      </Helmet>
      <DashboardHeader title="Study List" />

      {/* add new resource button  */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
          Add New
        </button>
      </div>

      {/* study form popup  */}
      <PopupBuilder
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add a new resource on your study list"
      >
        <StudyForm />
      </PopupBuilder>
    </DashboardLayout>
  )
}

export default StudyPage
