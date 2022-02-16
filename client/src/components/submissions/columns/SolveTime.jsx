import { useMutation } from "react-query"
import { updateSubmission } from "@/api/submissions"
import { toast } from "react-toastify"
import { useState } from "react"

export default function SolveTime(cell) {
  const [time, setTime] = useState(cell.value)

  const { mutate } = useMutation(updateSubmission, {
    onSuccess: (data) => {
      toast.success("Problem updated", { className: "toast" })
    },

    onError: (err) => {
      toast.error(err.response.data.message, { className: "toast" })
    },
  })

  const handleBlur = (value) => {
    mutate({ id: cell.row.original.id, solveTime: value })
  }

  return (
    <input
      type="number"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      onBlur={(e) => handleBlur(e.target.value)}
    />
  )
}
