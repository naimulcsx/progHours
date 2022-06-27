import { useMutation, useQueryClient } from "react-query"
import { updateSubmission } from "@/api/submissions"
import React, { useRef, useState } from "react"
import { Cell } from "react-table"
import { Submission } from "@/types/Submission"
import { AxiosError } from "axios"
import { Practice } from "@/types/Practice"
import { Input, useToast } from "@chakra-ui/react"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"

export default function SolveTime(cell: Cell<Submission>) {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const client = useQueryClient()
  const prevRef = useRef(cell.value)
  const [time, setTime] = useState(cell.value)

  const { mutate } = useMutation(updateSubmission, {
    onSuccess: () => {
      /**
       * After data is updated in the server, we need to update it the client state
       */
      toast({ title: "Submission Updated!", status: "success" })
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
      console.log(err)
      toast({ title: err.response?.data.message, status: "error" })
    },
  })

  const handleBlur = (value: string) => {
    if (prevRef.current !== time) {
      mutate({ id: cell.row.original.id, solve_time: parseInt(value, 10) })
      prevRef.current = value
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      mutate({ id: cell.row.original.id, solve_time: parseInt(time, 10) })
      prevRef.current = time
    }
  }

  return (
    <Input
      type="number"
      value={time}
      fontSize="sm"
      onChange={(e) => setTime(e.target.value)}
      onBlur={(e) => handleBlur(e.target.value)}
      onKeyUp={(e) => handleEnter(e)}
    />
  )
}
