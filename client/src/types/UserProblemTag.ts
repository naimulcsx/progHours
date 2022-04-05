import { Tag } from "./Tag"

export interface UserProblemTag {
  id: number
  problem_id: number
  tag_id: number
  user_id: number
  tag: Tag
}
