import { getAllUsers } from "~/api/user"
import UserManagementTable from "~/components/admin/user/userTable"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import type { User } from "~/contexts/UserContext"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"

export default function UserManagement() {
  const [users, setUsers] = useState(null)

  useQuery("users", getAllUsers, {
    onSuccess: (res) => {
      res.body.sort(function (a: User, b: User) {
        return a.id - b.id
      })
      setUsers(res.body)
    },
  })

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Users</title>
      </Helmet>
      {users && <UserManagementTable users={users} />}
    </DashboardLayout>
  )
}
