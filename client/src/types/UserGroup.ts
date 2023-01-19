import Group from "./Group"
import { Users } from "./User"

export default interface UserGroups {
  id: number
  group: Group
  groupId: number
  user: Users
  userId: number
  role: "ADMIN" | "MEMBER"
}
