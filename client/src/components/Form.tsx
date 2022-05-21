import React, { Fragment, ReactNode } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const FormControl = ({
  isInvalid = false,
  children,
  className,
}: {
  isInvalid?: boolean
  className?: string
  children?: ReactNode
}) => {
  const validChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type !== "string") {
      return child.type.name !== "ErrorMessage" ? child : null
    }
  })
  const errorChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type !== "string") {
      return child.type.name === "ErrorMessage" ? child : null
    }
  })
  return (
    <div className="">
      {validChildren}
      {isInvalid && errorChildren}
    </div>
  )
}

const Label = ({ children }: { children: ReactNode }) => {
  return (
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      {children}
    </label>
  )
}

const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <input
      {...props}
      className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  )
}

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return <div className="error-message">{children}</div>
}

const Select = ({
  children,
  value,
  onChange,
}: {
  children: ReactNode
  value: any
  onChange: any
}) => {
  const styles: {
    [key: string]: string
  } = {
    AC: "bg-lime-300 text-green-900 rounded-lg w-full font-medium text-center",
    WA: "bg-red-200 text-red-900 rounded-lg w-full font-medium text-center",
    RTE: "bg-pink-200 text-pink-900 rounded-lg w-full font-medium text-center",
    TLE: "bg-amber-200 text-amber-900 rounded-lg w-full font-medium text-center",
    MLE: "bg-cyan-200 text-cyan-900 rounded-lg w-full font-medium text-center",
  }
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <div>
            <Listbox.Button
              className={`text-sm ${
                styles[value]
                  ? styles[value]
                  : "rounded-lg w-full border border-gray-300"
              } relative w-full py-2 h-[40px] pr-10 bg-white cursor-default focus:outline-none focus:ring-2 focus:ring-primary ${
                open ? "ring-2 ring-primary ring-opacity-50" : ""
              }`}
            >
              <span className={`px-3 `}>{value}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className={`w-4 h-4 ${
                    styles[value] ? styles[value] : "text-gray-300"
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
              <Listbox.Options className="absolute z-[9999] w-[160px] py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {children}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

const Option = ({
  children,
  value,
}: {
  children: ReactNode
  value: string
}) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        classNames(
          active ? "text-white bg-indigo-600" : "text-gray-900",
          "cursor-default select-none relative py-2 pl-3 pr-9"
        )
      }
      value={value}
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
