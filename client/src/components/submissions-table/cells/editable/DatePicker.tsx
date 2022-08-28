import moment from "moment"
import { useState } from "react"
import { Cell } from "react-table"
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
import { Input, useToast } from "@chakra-ui/react"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"

const DatePicker = (cell: Cell<Submission>) => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const queryClient = useQueryClient()
  const [date, setDate] = useState(new Date(cell.value))

  const { mutate } = useMutation(updateSubmission, {
    onSuccess: () => {
      queryClient.invalidateQueries("submissions")
      /**
       * Show toast message
       */
      toast({ title: "Submission Updated!", status: "success" })
    },
    onError: (err: AxiosError) => {
      toast({ title: err.response?.data.message, status: "error" })
    },
  })
  const handleBlur = () => {
    mutate({ id: cell.row.original.id, solvedAt: date })
  }
  return (
    <ReactDatePicker
      selected={date}
      showTimeSelect
      dateFormat="EEE, dd MMM yyyy"
      customInput={<Input fontSize="sm" />}
      onCalendarClose={handleBlur}
      onChange={(date: Date) => {
        // const currentDate = new Date()
        // const dateToSend = moment(date)
        //   .set("hour", currentDate.getHours())
        //   .set("minute", currentDate.getMinutes())
        //   .set("second", currentDate.getSeconds())
        setDate(date)
      }}
    />
  )
}

export default DatePicker
