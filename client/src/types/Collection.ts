import { Problem } from "./Problem"

export interface Collection {
  id: number
  listId: number
  metaData: {}
  name: string
  order: number
  problems: Problem[]
}
