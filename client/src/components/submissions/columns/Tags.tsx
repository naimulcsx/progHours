import { useContext } from "react"
import { Cell } from "react-table"

/**
 * Import types
 */
import { Tag } from "@/types/Tag"
import { Submission } from "@/types/Submission"
import { UserProblemTag } from "@/types/UserProblemTag"

/**
 * Import components
 */
import TagInputPopup from "@/components/submissions/TagInputPopup"
import { GlobalContext } from "@/GlobalStateProvider"

const Tags = (cell: Cell<Submission>) => {
  let { user } = useContext(GlobalContext)
  const userId = user?.id
  const { id, tags, user_problem_tags } = cell.row.original.problem

  return (
    <ul className="flex gap-2 xl:flex-wrap">
      {tags.map((tag: Tag) => {
        return (
          <li>
            <span
              key={tag.id}
              className="inline-block bg-primary/[0.075] text-primary text-sm h-7 px-2 flex items-center rounded dark:bg-gray-700 dark:text-gray-300"
            >
              {tag.name}
            </span>
          </li>
        )
      })}
      {user_problem_tags
        .filter((t) => t.user_id === userId)
        .map((user_problem_tag: UserProblemTag) => {
          return (
            <li
              key={user_problem_tag.tag.id}
              className="relative px-2 py-1 text-sm text-gray-400 border rounded-lg suggested-tag"
            >
              <button className="absolute right-0 hidden w-4 h-4 p-1 text-red-500 rounded-full -top-3">
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16px"
                  height="16px"
                >
                  <path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59 L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12L17,15.59z" />
                </svg>
              </button>
              <p>{user_problem_tag.tag.name}</p>
            </li>
          )
        })}
      <li>
        <TagInputPopup problemId={id} />
      </li>
    </ul>
  )
}
export default Tags
