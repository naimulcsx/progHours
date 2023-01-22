import { DashboardLayout } from "~/components/templates"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import AdminProblemList from "~/components/organisms/admin-problem-list/AdminProblemList"
import { Problem } from "~/types/Problem"

export interface ProblemManagementTemplateProps {
  problems: Problem[]
}

export default function ProblemManagementTemplate({ problems }: ProblemManagementTemplateProps) {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Problems</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.35 }}
      >
        {problems && <AdminProblemList problems={problems} />}
      </motion.div>
    </DashboardLayout>
  )
}
