import { getAllUsers } from "~/api/user"
import UserManagementTable from "~/components/admin/user/userTable"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import type { User } from "~/contexts/UserContext"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { getUserGroups } from "~/api/groups"
import useUser from "~/hooks/useUser"
import GroupManagementTable from "~/components/admin/group/GroupTable"

export default function GroupManagement() {
  const { user } = useUser()

  const [groups, setGroups] = useState<any>()

  // fetch groups data
  const { isLoading, isFetching } = useQuery(["groups"], getUserGroups, {
    onSuccess: (data) => {
      setGroups(data?.body.groups.filter((group: any) => group.role === "ADMIN"))
    },
  })

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Groups</title>
      </Helmet>
      {groups && <GroupManagementTable groups={groups} />}
    </DashboardLayout>
  )
}
