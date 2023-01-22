import { DashboardLayout } from "~/components/templates"
import { Helmet } from "react-helmet-async"
import AdminUsersList from "~/components/organisms/admin-users-list/AdminUsersList"
import { motion } from "framer-motion"

export interface UserManagementTemplateProps {
  users: any
  isLoading: boolean
}

export default function UserManagementTemplate({ users, isLoading }: UserManagementTemplateProps) {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.35 }}
      >
        {users && <AdminUsersList users={users} />}
      </motion.div>
    </DashboardLayout>
  )
}
