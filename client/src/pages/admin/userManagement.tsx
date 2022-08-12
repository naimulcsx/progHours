import { getAllUsers } from "@/api/user"
import UserManagementTable from "@/components/admin/user/userTable"
import { AnimateLoading } from "@/components/AnimateLoading"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"

export default function UserManagement() {
  const [users, setUsers] = useState(null)

  useQuery("users", getAllUsers, {
    onSuccess: (res) => {
      setUsers(res.body)
    },
  })

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Admin | User Management</title>
      </Helmet>

      <AnimateLoading isLoaded={users}>
        {users && <UserManagementTable users={users} />}
      </AnimateLoading>
    </DashboardLayout>
  )
}
