import { useState } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "@/styles/datepicker.css"
import { updateSubmission } from "@/api/submissions"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const DatePicker = (cell) => {
  const [date, setDate] = useState(new Date(cell.value))
  const { mutate } = useMutation(updateSubmission, {
    onSuccess: (data) => {
      toast.success("Problem updated", { className: "toast" })
    },
    onError: (err) => {
      toast.error(err.response.data.message, { className: "toast" })
    },
  })
  const handleBlur = () => {
    mutate({ id: cell.row.original.id, solvedAt: date })
  }
  return (
    <ReactDatePicker
      dateFormat="dd MMM yyyy"
      className="h-[40px] px-3 focus:outline-none rounded focus:ring-2 ring-primary ring-opacity-50"
      selected={date}
      onCalendarClose={handleBlur}
      onChange={(date) => setDate(date)}
    />
  )
}

export default DatePicker
