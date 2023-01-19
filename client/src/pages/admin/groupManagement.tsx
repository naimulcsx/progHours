import { DashboardLayout } from "~/components/layouts/Dashboard"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { getGroups } from "~/api/groups"
import GroupManagementTable from "~/components/admin/group/GroupTable"
import Groups from "~/types/Group"

export default function GroupManagement() {
  const [groups, setGroups] = useState<Groups[]>()

  // fetch groups data
  useQuery(["groups"], getGroups, {
    onSuccess: (data) => {
      setGroups(data?.body.groups)
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
