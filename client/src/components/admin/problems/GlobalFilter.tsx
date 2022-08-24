import { Input } from "@chakra-ui/react"

export default function GlobalFilter({ filter, setFilter }) {
  return (
    <span>
      <Input w={24} ml={4}
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder ="Search"
      ></Input>
    </span>
  )
}
