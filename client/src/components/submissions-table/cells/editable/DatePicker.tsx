import moment from "moment"
import { ReactNode, useState } from "react"
import { Cell } from "react-table"
import toast from "react-hot-toast"
import { Submission } from "@/types/Submission"
import ReactDatePicker from "react-datepicker"
import { updateSubmission } from "@/api/submissions"
import { useMutation, useQueryClient } from "react-query"
import { AxiosError } from "axios"

/**
 * Import Styles
 */
import "react-datepicker/dist/react-datepicker.css"
import "@/styles/datepicker.css"
import { Input } from "@chakra-ui/react"

const DatePicker = (cell: Cell<Submission>) => {
  const queryClient = useQueryClient()
  const [date, setDate] = useState(new Date(cell.value))
  const { mutate } = useMutation(updateSubmission, {
    onSuccess: () => {
      queryClient.invalidateQueries("practice")
      /**
       * Show toast message
       */
      toast.success("Problem updated", { className: "toast" })
    },
    onError: (err: AxiosError) => {
      toast.error(err.response?.data.message, { className: "toast" })
    },
  })
  const handleBlur = () => {
    mutate({ id: cell.row.original.id, solved_at: date })
  }
  return (
    <ReactDatePicker
      selected={date}
      dateFormat="EEE, dd MMM yyyy"
      customInput={<Input fontSize="sm" />}
      onCalendarClose={handleBlur}
      onChange={(date) => {
        const currentDate = new Date()
        const dateToSend = moment(date)
          .set("hour", currentDate.getHours())
          .set("minute", currentDate.getMinutes())
          .set("second", currentDate.getSeconds())
        setDate(dateToSend.toDate())
      }}
    />
  )
}

export default DatePicker
