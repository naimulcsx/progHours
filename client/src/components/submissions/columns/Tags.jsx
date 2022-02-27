import { Popover } from "@headlessui/react"
import TagInputField from "../TagInputField"
const Tags = (cell) => {
  const { tags } = cell.row.original.problem
  if (tags.length === 0) return "—"
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
        <Popover>
          <Popover.Button className="relative px-2 py-1 text-sm rounded-lg bg-primary bg-opacity-10 text-primary">
            +
          </Popover.Button>
          <Popover.Panel className="absolute z-10 w-30 px-4 py-3 bg-white border-2 shadow-xl inset rounded-xl">
            <TagInputField></TagInputField>
          </Popover.Panel>
        </Popover>
      </li>
    </ul>
  )
}
export default Tags
