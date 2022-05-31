import DashboardHeader from "@/components/dashboard/Header"
import FormBuilder from "@/components/FormBuilder"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import { PlayIcon, TranslateIcon } from "@heroicons/react/solid"
import { Helmet } from "react-helmet-async"
import * as Yup from "yup"

const StudyPage = () => {
  return (
    <DashboardLayout dataDependency={[]}>
      <Helmet>
        <title>Study List</title>
      </Helmet>
      <DashboardHeader title="Study List" />
      <FormBuilder
        className="mt-6 space-y-4"
        fields={{
          link: {
            type: "text",
            label: "Link",
            validate: Yup.string()
              .trim()
              .required("University ID is required")
              .length(7, "Invalid University ID"),
          },
          study_time: {
            type: "text",
            label: "Study Time",
            validate: Yup.string().trim().required("Password is required"),
          },
          studied_at: {
            type: "date",
            label: "Study Date",
            validate: Yup.string().trim().required("Password is required"),
          },
        }}
        mutation={() => {}}
        onSuccess={(data) => {}}
        onError={(err) => {}}
        button={{
          label: "Add Study",
          className: "mt-6",
          loadingLabel: "Adding Study",
        }}
      />
    </DashboardLayout>
  )
}

export default StudyPage
