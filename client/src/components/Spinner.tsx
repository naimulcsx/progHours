import { Transition } from "@headlessui/react"
import { Fragment } from "react"

const Spinner = (props: { show: boolean }) => {
  return (
    <Transition
      as={Fragment}
      show={props.show}
      enter="transform transition duration-[400ms]"
      enterFrom="opacity-0 rotate-[-120deg] scale-50"
      enterTo="opacity-100 rotate-0 scale-100"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 rotate-0 scale-100 "
      leaveTo="opacity-0 scale-95"
    >
      <div className="sp sp-circle sp-circle-dark"></div>
    </Transition>
  )
}

export default Spinner
