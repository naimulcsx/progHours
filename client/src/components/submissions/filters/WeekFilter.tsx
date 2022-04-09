import { Fragment, useState } from "react"
import { Combobox, Transition } from "@headlessui/react"
import { SelectorIcon } from "@heroicons/react/solid"

export default function WeekFilters({ numberOfWeeks, selected, setSelected }) {
  const weeks = [{ id: 1, name: "All weeks" }]
  for (let i = numberOfWeeks; i >= 1; --i)
    weeks.push({ id: i + 1, name: "Week " + i })

  const [query, setQuery] = useState("")

  const filteredWeeks =
    query === ""
      ? weeks
      : weeks.filter((week) =>
          week.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )

  return (
    <div className="w-32">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full text-left cursor-default focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm">
            <Combobox.Input
              className="bg-primary rounded-md text-primary bg-opacity-10 w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5"
              displayValue={(week) => week.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="w-5 h-5 text-primary"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-[800] w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredWeeks.length === 0 && query !== "" ? (
                <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredWeeks.map((week) => (
                  <Combobox.Option
                    key={week.id}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-6 pr-4 ${
                        active ? "text-white bg-primary" : "text-gray-900"
                      }`
                    }
                    value={week}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {week.name}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
