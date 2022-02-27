import { useState } from "react"
import { Combobox } from "@headlessui/react"
const tags = [
  "implementation",
  "math",
  "greedy",
  "dp",
  "data structures",
  "brute force",
  "constructive algorithms",
  "graphs",
  "sortings",
  "binary search",
  "dfs and similar",
  "trees",
  "string",
  "number theory",
  "combinatorics",
  "geometry",
  "bitmasks",
  "two pointers",
  "dsu",
  "shortest paths ",
  "probabilities",
  "divide and conquer ",
  "hashing",
]
export default function TagInputField() {
  const [selectedPerson, setSelectedPerson] = useState("")
  const [query, setQuery] = useState("")
  const filteredTags =
    query === ""
      ? tags
      : tags.filter((value) => {
          return value.toLowerCase().includes(query.toLowerCase())
        })
  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        className="input-box "
      />
      <Combobox.Options>
        {filteredTags.map((value) => (
          <Combobox.Option key={value} value={value}>
            {value}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}
