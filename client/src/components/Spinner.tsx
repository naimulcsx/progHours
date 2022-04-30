import { Transition } from "@headlessui/react"
import { Fragment } from "react"

const Spinner = (props: { show: boolean }) => {
  return (
    <Transition
      as={Fragment}
      show={props.show}
      enter="transform transition duration-[400ms]"
      enterFrom="opacity-0 scale-70"
      enterTo="opacity-100 rotate-0 scale-100"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 rotate-0 scale-100"
      leaveTo="opacity-0 scale-70"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="animate-spin h-5 w-5 text-blue-900"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          className="opacity-25"
        ></circle>
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          className="opacity-75"
        ></path>
      </svg>
    </Transition>
  )
}

export default Spinner
