import { useMutation, useQueryClient } from "react-query"
import { updateSubmission } from "~/api/submissions"
import React, { useRef, useState } from "react"
import { Submission } from "~/types/Submission"
import { Practice } from "~/types/Practice"
import { CellContext } from "@tanstack/react-table"
import { TextInput } from "@mantine/core"
import showToast from "~/utils/showToast"

export default function SolveTime(cell: CellContext<Submission, unknown>) {
  const client = useQueryClient()
  const prevRef = useRef(cell.getValue())
  const [time, setTime] = useState(cell.getValue() as string)

  const { mutate } = useMutation(updateSubmission, {
    onSuccess: (res) => {
      /**
       * After data is updated in the server, we need to update it the client state
       */
      showToast("success", res.message)
      const oldData: Practice | undefined = client.getQueryData("submissions")
      const newData = oldData?.body.submissions.map((el: Submission) => {
        /**
         * If this submission is the one, we updated on server, update it's solvetime
         */
        if (el.id === cell.row.original.id) {
          return { ...el, solveTime: parseInt(time) }
        }
        return el
      })
      client.setQueryData("submissions", {
        body: {
          submissions: newData,
        },
      })
    },
    onError: (err: any) => {
      showToast("error", err?.response?.data.message)
    },
  })

  const handleBlur = (value: string) => {
    if (prevRef.current !== time) {
      mutate({ id: cell.row.original.id, solveTime: Number(value) })
      prevRef.current = value
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && prevRef.current !== time) {
      mutate({ id: cell.row.original.id, solveTime: parseInt(time) })
      prevRef.current = time
    }
  }

  return (
    <TextInput
      type="number"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      onBlur={(e) => handleBlur(e.target.value)}
      onKeyUp={(e) => handleEnter(e)}
    />
  )
}
