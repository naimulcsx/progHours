import { useQuery } from "react-query"
import { getAllUsers } from "~/api/user"
import UserManagementTemplate from "~/components/templates/user-management/UserManagement"

export default function UserManagementPage() {
  const usersQuery = useQuery("users", getAllUsers)
  return <UserManagementTemplate users={usersQuery?.data?.body} isLoading={usersQuery.isLoading} />
}
