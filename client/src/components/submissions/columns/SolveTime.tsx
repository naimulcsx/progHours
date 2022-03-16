import { useMutation, useQueryClient } from "react-query"
import { updateSubmission, getSubmissions } from "@/api/submissions"
import { toast } from "react-toastify"
import { useEffect, useRef, useState } from "react"
import moment from "moment"

export default function SolveTime(cell) {
  const client = useQueryClient()
  const prevRef = useRef(cell.value)
  const [time, setTime] = useState(cell.value)

  const { mutate } = useMutation(updateSubmission, {
    onSuccess: (data) => {
      toast.success("Problem updated", { className: "toast" })
      const oldData = client.getQueryData("practice")
      const newData = oldData.submissions.map((el) => {
        if (cell.row.original.id == el.id) {
          return { ...el, solve_time: parseInt(time) }
        }
        return el
      })
      client.setQueryData("practice", { submissions: newData })
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
