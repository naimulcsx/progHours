import UserGroup from "./UserGroup"

export default interface Groups {
  id: number
  name: string
  hashtag: string
  accessCode: string
  createdAt: string
  users: UserGroup[]
  private: boolean
}
