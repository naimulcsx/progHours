import UserGroup from "./UserGroup"

export default interface Group {
  id: number
  name: string
  slug: string
  accessCode: string
  createdAt: string
  users: UserGroup[]
  private: boolean
}
