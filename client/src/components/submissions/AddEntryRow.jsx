import {
  FormControl,
  Select,
  Option,
  Input,
  Label,
  ErrorMessage,
} from "@/components/Form"
import { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "@/styles/datepicker.css"
import * as Yup from "yup"
import { useFormik } from "formik"
import { toast } from "react-toastify"
import { useQueryClient, useMutation } from "react-query"
import { getSubmissions, createSubmission } from "@/api/submissions"

const submissionSchema = Yup.object().shape({
  link: Yup.string().trim().required("Problem link is required"),
  solveTime: Yup.number("Solve time must be a number").required(
    "Solve time is required"
  ),
  verdict: Yup.string().required("Verdict is required"),
})

const AddEntryRow = ({ id }) => {
  const queryClient = useQueryClient()
  const [startDate, setStartDate] = useState(new Date())
  const [selected, setSelected] = useState("AC")

  const formik = useFormik({
    initialValues: {
      link: "",
      solveTime: "",
      verdict: "AC",
    },
    validationSchema: submissionSchema,
    onSubmit: async (values) => {
      mutate(values)
    },
  })

  const { mutate, isLoading } = useMutation(createSubmission, {
    onSuccess: (data) => {
      formik.resetForm()
      queryClient.invalidateQueries("practice", getSubmissions)
      toast.success("Problem submitted successfully")
    },
    onError: (err) => {
      toast.error(err.response.data.message, { className: "toast" })
    },
  })

  const handleSelected = (value) => {
    setSelected(value)
    formik.setFieldValue("verdict", value)
  }

  const handleSubmit = () => {
    const errorNames = Object.keys(formik.errors)
    if (errorNames.length > 0) {
      errorNames.forEach((el) => {
        toast.error(formik.errors[el], {
          className: "toast",
          toastId: formik.errors[el],
        })
      })
      return
    }
    formik.handleSubmit()
  }

  return (
    <tr className="bg-primary bg-opacity-10">
      <td className="px-6 py-2">{id}</td>
      <td className="px-6 py-2">
        <FormControl className="form">
          <Input
            type="text"
            placeholder="Problem Link"
            className="h-[40px] rounded p-2 w-full"
            {...formik.getFieldProps("link")}
          ></Input>
        </FormControl>
      </td>
      <td className="px-6 py-2">
        <Select value={selected} onChange={handleSelected}>
          <Option value="AC">AC</Option>
          <Option value="WA">WA</Option>
          <Option value="TLE">TLE</Option>
          <Option value="RTE">RTE</Option>
          <Option value="MLE">MLE</Option>
        </Select>
      </td>
      <td className="px-6 py-2">
        <FormControl className="form">
          <Input
            type="text"
            placeholder="Solve Time"
            className="h-[40px] rounded p-2 w-full"
            {...formik.getFieldProps("solveTime")}
          ></Input>
        </FormControl>
        {/* <input
          type="text"
          placeholder="Solve Time"
          className="h-[40px] rounded px-3"
        /> */}
      </td>
      <td className="px-6 py-2">
        <button className="bg-gray-900 text-white px-3 py-1 rounded">
          + Tags
        </button>
      </td>
      <td className="px-6 py-2">
        <ReactDatePicker
          className="h-[40px] px-3 focus:outline-none rounded focus:ring-2 ring-primary ring-opacity-50"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </td>
      <td className="px-6 py-2">
        <button
          type="submit"
          className="bg-gray-900 text-white px-3 py-1 rounded flex items-center space-x-2"
          onClick={handleSubmit}
        >
          {isLoading && <div className="sp sp-circle"></div>}
          <span>{isLoading ? "Creating" : "Create"}</span>
        </button>
      </td>
    </tr>
  )
}

export default AddEntryRow
