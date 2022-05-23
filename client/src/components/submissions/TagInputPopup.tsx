import { Transition, Popover } from "@headlessui/react"
import { Fragment } from "react"
import TagInputField from "./TagInputField"

export default function TagInputPopup({ problemId }: { problemId: number }) {
  return (
    <Popover className="">
      <Popover.Button className="relative flex items-center px-2 text-sm rounded h-7 bg-primary bg-opacity-10 text-primary">
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
                  problemId={problemId}
                  closePopover={close}
                ></TagInputField>
              </div>
            )
          }}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
