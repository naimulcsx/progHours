import { useQuery } from "react-query"
import { getGroups } from "~/api/groups"
import GroupManagementTemplate from "~/components/templates/group-management/GroupManagement"

export default function GroupManagementPage() {
  const groupsQuery = useQuery(["groups"], getGroups)
  return (
    <GroupManagementTemplate
      groups={groupsQuery?.data?.body?.groups}
      isLoading={groupsQuery.isLoading || groupsQuery.isFetching}
    />
  )
}
