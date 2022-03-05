import { useMutation } from "react-query"
import { updateSubmission } from "@/api/submissions"
import { toast } from "react-toastify"
import { useRef, useState } from "react"

export default function SolveTime(cell) {
  const prevRef = useRef(cell.value)
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
    if (prevRef.current !== time) {
      mutate({ id: cell.row.original.id, solve_time: parseInt(value, 10) })
      prevRef.current = value
    }
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
