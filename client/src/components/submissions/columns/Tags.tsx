import { Transition, Popover } from "@headlessui/react"
import TagInputField from "../TagInputField"
import { Fragment } from "react"

const Tags = (cell) => {
  const user = localStorage.getItem("userId")
  const { id, tags, user_problem_tags } = cell.row.original.problem
  return (
    <ul className="tags-ul flex flex-wrap items-center gap-2">
      {tags.map((tag) => {
        return (
          <li
            key={tag.id}
            className="px-2 py-1 text-sm rounded-lg bg-primary bg-opacity-10 text-primary"
          >
            {tag.name}
          </li>
        )
      })}
      {user_problem_tags?.map((user_problem_tag) => {
        if (user_problem_tag.user_id !== parseInt(user)) return
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
        <Popover className="mt-1">
          <Popover.Button className="relative px-2 py-1 text-sm rounded-lg bg-primary bg-opacity-10 text-primary">
            +
          </Popover.Button>{" "}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute z-10 min-w-[260px] mt-2 py-3 shadow rounded-xl  bg-white border">
              {({ close }) => {
                return (
                  <div>
                    <div className="px-4">
                      <p className="font-medium text-primary">Suggest Tag</p>
                      <p className="mb-2 text-sm text-gray-400">
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
          </Transition>
        </Popover>
      </li>
    </ul>
  )
}
export default Tags
