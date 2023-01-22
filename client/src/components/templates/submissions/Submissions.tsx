import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "~/components/templates"
import { SubmissionsList } from "~/components/organisms"
import { Submission } from "~/types/Submission"

export interface SubmissionsTemplateProps {
  submissions?: Submission[]
}

export default function SubmissionsTemplate({ submissions }: SubmissionsTemplateProps) {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Submissions</title>
      </Helmet>
      {submissions && <SubmissionsList submissions={submissions} />}
    </DashboardLayout>
  )
}
