import { useQuery } from "react-query"
import { getGroups } from "~/api/groups"
import GroupsTemplate from "~/components/templates/groups/Groups"

export default function GroupsPage() {
  const groupsQuery = useQuery(["groups"], getGroups)
  const isLoading = groupsQuery.isLoading || groupsQuery.isFetching
  return <GroupsTemplate groups={groupsQuery?.data?.body?.userGroups} isLoading={isLoading} />
}
