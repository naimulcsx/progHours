import { useState } from "react"
import { Combobox } from "@headlessui/react"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import { addTag, getSubmissions } from "../../api/submissions"

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
  "shortest paths",
  "probabilities",
  "divide and conquer",
  "hashing",
]

export default function TagInputField({ problemId, closePopover }) {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(addTag, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("submissions")
      toast.success("Tag suggested.")
    },
    onError: (err) => {
      toast.error(err.response.data.message, { className: "toast" })
    },
  })

  const [selectedPerson, setSelectedPerson] = useState("")
  const [tagName, setTagName] = useState("")
  const filteredTags =
    tagName === ""
      ? tags.slice(0, 6)
      : tags
          .filter((value) => {
            return value.toLowerCase().includes(tagName.toLowerCase())
          })
          .slice(0, 6)

  const handleSubmit = (e) => {
    if (e.key == "Enter") {
      if (!tags.includes(e.target.value))
        toast.error("Tag is not allowed :(", { className: "toast" })
      else {
        mutate({ id: problemId, tag_name: e.target.value })
        closePopover()
      }
    }
  }
  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <form className="px-4" onKeyUp={handleSubmit}>
        <Combobox.Input
          autoComplete="off"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="text-sm w-full border focus:outline-none py-2 px-2 focus:ring-2 focus:ring-primary rounded-lg"
          placeholder="eg. number theory"
        />
      </form>
      <Combobox.Options className=" focus:bg-primary mt-4 divide-y divide-gray-100">
        {filteredTags.length === 0 && (
          <p className="mx-4 text-gray-500 text-sm">Can't find anything</p>
        )}
        {filteredTags.map((value) => (
          <Combobox.Option
            key={value}
            value={value}
            className={({ active }) =>
              active
                ? "bg-primary text-primary rounded bg-opacity-10 cursor-pointer text-sm mx-4 hover:text-primary"
                : "cursor-pointer text-sm mx-4 hover:text-primary"
            }
          >
            <div className="px-3 py-1.5">{value}</div>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}
