import { Select, Option } from "@/components/Form"
import { useState } from "react"

const Verdict = (cell) => {
  const [selected, setSelected] = useState(cell.value)
  console.log(selected)
  return (
    <select value={selected} onChange={(e) => setSelected(e.target.value)}>
      <option value="AC">AC</option>
      <option value="WA">WA</option>
      <option value="TLE">TLE</option>
      <option value="RTE">RTE</option>
      <option value="MLE">MLE</option>
    </select>
    // <Select value={selected} onChange={handleSelected} key={cell.value}>
    //   <Option value="AC">AC</Option>
    //   <Option value="WA">WA</Option>
    //   <Option value="TLE">TLE</Option>
    //   <Option value="RTE">RTE</Option>
    //   <Option value="MLE">MLE</Option>
    // </Select>
  )
}

export default Verdict
