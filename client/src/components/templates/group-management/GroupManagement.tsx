import { DashboardLayout } from "~/components/templates"
import { Helmet } from "react-helmet-async"
import { AdminGroupsList } from "~/components/organisms"
import { motion } from "framer-motion"

export interface GroupManagementTemplateProps {
  groups: any
  isLoading: boolean
}

export default function GroupManagementTemplate({
  groups,
  isLoading,
}: GroupManagementTemplateProps) {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Groups</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.35 }}
      >
        {groups && <AdminGroupsList groups={groups} />}
      </motion.div>
    </DashboardLayout>
  )
}
