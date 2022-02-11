import React, { Fragment, isValidElement } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const FormControl = ({ isInvalid, ...props }) => {
  const children = React.Children.toArray(props.children).filter((child) =>
    isValidElement(child)
  )
  return (
    <div className="form-group" {...props}>
      {children.filter((child) => child.type !== ErrorMessage)}
      {isInvalid && children.find((child) => child.type === ErrorMessage)}
    </div>
  )
}

const Label = ({ children }) => {
  return <label>{children}</label>
}

const Input = (props) => {
  return <input {...props} />
}

const ErrorMessage = ({ children }) => {
  return <div className="error-message">{children}</div>
}

const Select = ({ children, ...props }) => {
  const styles = {
    AC: "bg-emerald-100 text-emerald-900 rounded w-full font-medium text-center",
    WA: "bg-red-100 text-red-900 rounded w-full font-medium text-center",
    RTE: "bg-pink-100 text-pink-900 rounded w-full font-medium text-center",
    TLE: "bg-amber-100 text-amber-900 rounded w-full font-medium text-center",
    MLE: "bg-cyan-100 text-cyan-900 rounded w-full font-medium text-center",
  }
  return (
    <Listbox {...props}>
      {({ open }) => (
        <>
          <div className="relative mt-1 w-24">
            <Listbox.Button
              className={`${
                styles[props.value]
              } relative w-full py-2 h-[40px] pr-10 shadow-sm bg-white cursor-default focus:outline-none ${
                open ? "ring-2 ring-primary ring-opacity-50" : ""
              }`}
            >
              <span className={`px-3 `}>{props.value}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className={`w-4 h-4 ${
                    styles[props.value] ? styles[props.value] : "text-gray-300"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-[9999] w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {children}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

const Option = ({ children, ...props }) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        classNames(
          active ? "text-white bg-indigo-600" : "text-gray-900",
          "cursor-default select-none relative py-2 pl-3 pr-9"
        )
      }
      {...props}
    >
      {({ selected, active }) => (
        <>
          <span
            className={classNames(
              selected ? "font-semibold" : "font-normal",
              "block truncate"
            )}
          >
            {children}
          </span>

          {selected ? (
            <span
              className={classNames(
                active ? "text-white" : "text-indigo-600",
                "absolute inset-y-0 right-0 flex items-center pr-4"
              )}
            >
              <CheckIcon className="w-5 h-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  )
}

export { FormControl, Label, Input, ErrorMessage, Select, Option }
