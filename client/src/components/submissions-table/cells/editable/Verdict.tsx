import { useState } from "react"
import { AxiosError } from "axios"
import { Cell } from "react-table"
import { useMutation, useQueryClient } from "react-query"

/**
 * Import Components
 */
import { Select, useToast } from "@chakra-ui/react"
import { updateSubmission } from "@/api/submissions"

/**
 * Import types
 */
import { Submission } from "@/types/Submission"
import { Practice } from "@/types/Practice"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"

const Verdict = (cell: Cell<Submission>) => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const client = useQueryClient()
  const [selected, setSelected] = useState(cell.value)

  const { mutate } = useMutation(updateSubmission, {
    onSuccess: () => {
      /**
       * Show toast message
       */
      toast({ title: "Submission Updated!", status: "success" })
    },
    onError: (err: AxiosError) => {
      /**
       * Show toast message
       */
      console.log(err)
      // toast.error(err.response?.data.message, { className: "toast" })
    },
  })

  const handleSelected = (value: any) => {
    value = value.target.value
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
    if (value !== cell.row.original.verdict) {
      mutate({ id: cell.row.original.id, verdict: value })
    }

    setSelected(value)
  }

  const styles: any = {
    AC: {
      bg: "green.100",
      color: "green.900",
      borderColor: "green.200",
    },
    WA: {
      bg: "red.100",
      color: "red.900",
      borderColor: "red.200",
    },
  }

  return (
    <Select
      value={selected}
      onChange={handleSelected}
      key={cell.value}
      fontWeight="bold"
      fontSize="sm"
      {...styles[cell.value]}
    >
      <option value="AC">AC</option>
      <option value="WA">WA</option>
      {/* <option value="TLE">TLE</option>
      <option value="RTE">RTE</option>
      <option value="MLE">MLE</option> */}
    </Select>
  )
}

export default Verdict
