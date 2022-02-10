import { useState } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "@/styles/datepicker.css"

const DatePicker = () => {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <ReactDatePicker
      className="h-[40px] px-3 focus:outline-none rounded focus:ring-2 ring-primary ring-opacity-50"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  )
}

export default DatePicker
