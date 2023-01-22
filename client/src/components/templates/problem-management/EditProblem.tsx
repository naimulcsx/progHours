import { DashboardLayout } from "~/components/templates"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import AdminProblemList from "~/components/organisms/admin-problem-list/AdminProblemList"
import { Problem } from "~/types/Problem"
import { Tag } from "~/types/Tag"
import EditProblemForm from "~/components/organisms/admin-problem-list/EditProblemForm"
import { Box } from "@mantine/core"

export interface EditProblemTemplateProps {
  problem: Problem
  tags: Tag[]
  pid: string
  isLoading: boolean
}

export default function EditProblemTemplate({
  problem,
  tags,
  pid,
  isLoading,
}: EditProblemTemplateProps) {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Problems | {problem.name}</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.35 }}
      >
        <Box sx={{ maxWidth: "1024px", margin: "0 auto" }}>
          {problem && tags ? <EditProblemForm problem={problem} tags={tags} pid={pid} /> : null}
        </Box>
      </motion.div>
    </DashboardLayout>
  )
}
