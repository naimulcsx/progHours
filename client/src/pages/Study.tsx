import DashboardHeader from "@/components/dashboard/Header"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import { PlayIcon, TranslateIcon } from "@heroicons/react/solid"
import { Helmet } from "react-helmet-async"

const StudyPage = () => {
  return (
    <DashboardLayout dataDependency={[]}>
      <Helmet>
        <title>Study List</title>
      </Helmet>
      <DashboardHeader title="Study List" />
    </DashboardLayout>
  )
}

export default StudyPage
