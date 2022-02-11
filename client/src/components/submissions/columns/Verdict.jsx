import { Select, Option } from "@/components/Form"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { updateSubmission, getSubmissions } from "@/api/submissions"
import { toast } from "react-toastify"

const Verdict = (cell) => {
  const [selected, setSelected] = useState(cell.value)

  const { mutate } = useMutation(updateSubmission, {
    onSuccess: (data) => {
      toast.success("Problem updated", { className: "toast" })
    },

    onError: (err) => {
      toast.error(err.response.data.message, { className: "toast" })
    },
  })

  const handleSelected = (value) => {
    mutate({ id: cell.row.original.id, verdict: value })
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
