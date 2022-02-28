import { Popover } from "@headlessui/react"
import TagInputField from "../TagInputField"
const Tags = (cell) => {
  const { id, tags, user_tags } = cell.row.original.problem
  if (tags.length === 0) return "—"
  return (
    <ul className="flex flex-wrap">
      {tags.map((tag) => {
        return (
          <li
            key={tag.id}
            className="mt-1 mr-2 bg-primary bg-opacity-10 text-primary px-2 py-1 text-sm rounded-lg"
          >
            {tag.name}
          </li>
        )
      })}
      {user_tags.map((tag) => {
        return (
          <li
            key={tag.id}
            className="mt-1 mr-2 border text-gray-400 px-2 py-1 text-sm rounded-lg"
          >
            {tag.tag_name}
          </li>
        )
      })}
      <li>
        <Popover className="mt-1 relative">
          <Popover.Button className="relative px-2 py-1 text-sm rounded-lg bg-primary bg-opacity-10 text-primary">
            +
          </Popover.Button>
          <Popover.Panel className="absolute z-10 min-w-[260px] top-10 py-3 bg-white shadow rounded-xl  bg-white border">
            {({ close }) => {
              return (
                <div>
                  <div className="px-4">
                    <p className="font-medium text-primary">Suggest Tag</p>
                    <p className="text-sm text-gray-400 mb-2">
                      Suggest a tag that is revelant to this problem.
                    </p>
                  </div>
                  <TagInputField
                    problemId={id}
                    closePopover={close}
                  ></TagInputField>
                </div>
              )
            }}
          </Popover.Panel>
        </Popover>
      </li>
    </ul>
  )
}
export default Tags
