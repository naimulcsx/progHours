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
import { Popover } from "@headlessui/react"
import TagInputField from "./TagInputField"
const submissionSchema = Yup.object().shape({
  link: Yup.string().trim().required("Problem link is required"),
  solve_time: Yup.number("Solve time must be a number").required(
    "Solve time is required"
  ),
  verdict: Yup.string().required("Verdict is required"),
  solved_at: Yup.date().required("Date is required"),
})

const AddEntryRow = ({ id }) => {
  const queryClient = useQueryClient()
  const [selected, setSelected] = useState("AC")

  const formik = useFormik({
    initialValues: {
      link: "",
      solve_time: "",
      verdict: "AC",
      solved_at: new Date(),
    },
    validationSchema: submissionSchema,
    onSubmit: async (values) => {
      values.solve_time = parseInt(values.solve_time)
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
      console.log(err.response)
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
    <tr className="bg-white">
      <td className="border border-slate-100" data-idx>
        {id}
      </td>
      <td className="border border-slate-100" data-problem-name>
        <FormControl className="form">
          <Input
            type="text"
            placeholder="Problem Link"
            autoComplete="off"
            className="inset"
            {...formik.getFieldProps("link")}
          ></Input>
        </FormControl>
      </td>
      <td className="border border-slate-100" data-verdict>
        <Select value={selected} onChange={handleSelected}>
          <Option value="AC">AC</Option>
          <Option value="WA">WA</Option>
          <Option value="TLE">TLE</Option>
          <Option value="RTE">RTE</Option>
          <Option value="MLE">MLE</Option>
        </Select>
      </td>
      <td className="border border-slate-100" data-solve_time>
        <FormControl className="form">
          <Input
            type="text"
            placeholder="eg. 80"
            autoComplete="off"
            className="focus:outline-none p-2 w-full"
            {...formik.getFieldProps("solve_time")}
          ></Input>
        </FormControl>
        {/* <input
          type="text"
          placeholder="Solve Time"
          className="h-[40px] rounded px-3"
        /> */}
      </td>

      <td className="border border-slate-100" data-tags>
        <Popover>
          <Popover.Button className="bg-gray-900 text-white px-3 py-1 rounded">
            Add Tags
          </Popover.Button>
          <Popover.Panel className="absolute z-10 w-30 px-4 py-3 bg-white border-2 shadow-xl inset rounded-xl">
            <TagInputField></TagInputField>
          </Popover.Panel>
        </Popover>
      </td>
      <td></td>
      <td className="border border-slate-100" data-solved_at>
        <ReactDatePicker
          dateFormat="EEE, dd MMM yyyy"
          // className="h-[40px] px-3 focus:outline-none rounded focus:ring-2 ring-primary ring-opacity-50"
          selected={formik.values.solved_at}
          onChange={(date) => formik.setFieldValue("solved_at", date)}
        />
      </td>
      <td className="border border-slate-100" data-actions>
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
