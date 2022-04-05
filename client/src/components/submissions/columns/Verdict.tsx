import { useState } from "react"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { Cell } from "react-table"
import { useMutation, useQueryClient } from "react-query"

/**
 * Import Components
 */
import { Select, Option } from "@/components/Form"
import { updateSubmission } from "@/api/submissions"

/**
 * Import types
 */
import { Submission } from "@/types/Submission"
import { Practice } from "@/types/Practice"

const Verdict = (cell: Cell<Submission>) => {
  const client = useQueryClient()
  const [selected, setSelected] = useState(cell.value)

  const { mutate } = useMutation(updateSubmission, {
    onSuccess: () => {
      /**
       * Show toast message
       */
      toast.success("Problem updated", { className: "toast" })
    },
    onError: (err: AxiosError) => {
      /**
       * Show toast message
       */
      toast.error(err.response?.data.message, { className: "toast" })
    },
  })

  const handleSelected = (value: string) => {
    const oldData: Practice | undefined = client.getQueryData("practice")
    /**
     * If this submission is the one, we updated on, update it's verdict
     */
    const newData = oldData?.submissions.map((el) => {
      if (cell.row.original.id == el.id) {
        return { ...el, verdict: value }
      }
      return el
    })
    /**
     * Update the new client state
     */
    client.setQueryData("practice", { submissions: newData })

    /**
     * Update the data in the server
     */
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
