import DashboardHeader from "@/components/dashboard/Header"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import PopupBuilder from "@/components/PopupBuilder"
import StudyForm from "@/components/study/StudyForm"
import { Button } from "@chakra-ui/react"
import { PlusIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { Helmet } from "react-helmet-async"

const StudyPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DashboardLayout title="Study List">
      <Helmet>
        <title>Study List</title>
      </Helmet>
      {/* add new resource button  */}
      <div className="flex justify-end">
        <Button
          size="sm"
          onClick={() => setIsOpen(true)}
          type="button"
          leftIcon={<PlusIcon height={20} width={20} aria-hidden="true" />}
        >
          Add New
        </Button>
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
