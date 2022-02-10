import { Select, Option } from "@/components/Form"
import { useState } from "react"

const Verdict = (cell) => {
  const [selected, setSelected] = useState(cell.value)
  const handleSelected = (value) => {
    setSelected(value)
  }
  return (
    <Select value={selected} onChange={handleSelected} key={cell.value}>
      <Option value="AC">AC</Option>
      <Option value="WA">WA</Option>
      <Option value="TLE">TLE</Option>
      <Option value="RTE">RTE</Option>
      <Option value="MLE">MLE</Option>
    </Select>
  )
}

export default Verdict
