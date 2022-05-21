import { useMutation, useQueryClient } from "react-query"
import { updateSubmission, getSubmissions } from "@/api/submissions"
import toast from "react-hot-toast"
import { useEffect, useRef, useState } from "react"
import moment from "moment"
import { Cell } from "react-table"
import { Submission } from "@/types/Submission"
import { AxiosError } from "axios"
import { Practice } from "@/types/Practice"

export default function SolveTime(cell: Cell<Submission>) {
  const client = useQueryClient()
  const prevRef = useRef(cell.value)
  const [time, setTime] = useState(cell.value)

  const { mutate } = useMutation(updateSubmission, {
    onSuccess: () => {
      /**
       * After data is updated in the server, we need to update it the client state
       */
      toast.success("Problem updated", { className: "toast" })
      const oldData: Practice | undefined = client.getQueryData("practice")
      const newData = oldData?.submissions.map((el: Submission) => {
        /**
         * If this submission is the one, we updated on server, update it's solvetime
         */
        if (el.id === cell.row.original.id) {
          return { ...el, solve_time: parseInt(time) }
        }
        return el
      })
      client.setQueryData("practice", { submissions: newData })
    },
    onError: (err: AxiosError) => {
      toast.error(err.response?.data.message, { className: "toast" })
    },
  })

  const handleBlur = (value: string) => {
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
