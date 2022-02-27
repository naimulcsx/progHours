import { useState } from "react"
import TagInputPopup from "../TagInputPopup"
const Tags = (cell) => {
  const { tags } = cell.row.original.problem
  if (tags.length === 0) return "—"
  useState
  const [flage, setFlage] = useState(false)
  return (
    <ul className="flex space-x-2">
      {tags.map((tag) => {
        return (
          <li
            key={tag.id}
            className="bg-primary bg-opacity-10 text-primary px-2 py-1 text-sm rounded-lg"
          >
            {tag.name}
          </li>
        )
      })}
      <li>
        <button
          className="bg-primary bg-opacity-10 text-primary px-2 py-1 text-sm rounded-lg"
          onClick={() => setFlage(!flage)}
        >
          +
        </button>
        {flage && (
          <TagInputPopup flage={flage} setFlage={setFlage}></TagInputPopup>
        )}
      </li>
    </ul>
  )
}
export default Tags
