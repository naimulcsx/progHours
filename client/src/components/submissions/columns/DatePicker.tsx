import { useState } from "react"
import ReactDatePicker from "react-datepicker"
import { updateSubmission } from "@/api/submissions"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { Cell } from "react-table"

/**
 * Import Styles
 */
import "react-datepicker/dist/react-datepicker.css"
import "@/styles/datepicker.css"

const DatePicker = (cell: Cell) => {
  const queryClient = useQueryClient()
  const [date, setDate] = useState(new Date(cell.value))
  const { mutate } = useMutation(updateSubmission, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("practice")
      toast.success("Problem updated", { className: "toast" })
    },
    onError: (err) => {
      toast.error(err.response.data.message, { className: "toast" })
    },
  })
  const handleBlur = () => {
    mutate({ id: cell.row.original.id, solved_at: date })
  }
  return (
    <ReactDatePicker
      dateFormat="EEE, dd MMM yyyy"
      selected={date}
      onCalendarClose={handleBlur}
      onChange={(date) => {
        setDate(date)
      }}
    />
  )
}

export default DatePicker
