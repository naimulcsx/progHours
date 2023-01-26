import { Collection } from "./Collection"
import Group from "./Group"

export interface List {
  collections: Collection[]
  group: Group
  groupId: number
  id: number
  name: string
}
