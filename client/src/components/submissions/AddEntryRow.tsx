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
import { AddIcon } from "../Icons"

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
      toast.error(err.response.data.message, { className: "toast" })
    },
  })

  const handleSelected = (value) => {
    setSelected(value)
    formik.setFieldValue("verdict", value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
        <form id="add-submission" onSubmit={handleSubmit}></form>
        <FormControl className="form">
          <Input
            type="text"
            form="add-submission"
            placeholder="Problem Link"
            autoComplete="off"
            className="inset"
            {...formik.getFieldProps("link")}
          ></Input>
        </FormControl>
      </td>
      <td className="border border-slate-100" data-verdict>
        <Select
          value={selected}
          onChange={handleSelected}
          form="add-submission"
        >
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
            form="add-submission"
            className="w-full p-2 focus:outline-none"
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
          <Popover.Button className="px-3 py-1 text-white bg-gray-900 rounded">
            Add Tags
          </Popover.Button>
          <Popover.Panel className="absolute z-10 px-4 py-3 bg-white border-2 shadow-xl w-30 inset rounded-xl">
            <TagInputField></TagInputField>
          </Popover.Panel>
        </Popover>
      </td>
      <td className="border border-slate-100"></td>
      <td className="border border-slate-100" data-solved_at>
        <ReactDatePicker
          dateFormat="EEE, dd MMM yyyy"
          form="add-submission"
          // className="h-[40px] px-3 focus:outline-none rounded focus:ring-2 ring-primary ring-opacity-50"
          selected={formik.values.solved_at}
          onChange={(date) => formik.setFieldValue("solved_at", date)}
        />
      </td>
      <td className="border border-slate-100" data-actions>
        <button
          form="add-submission"
          type="submit"
          className="flex items-center px-1 py-1 space-x-2 border rounded"
          // onClick={handleSubmit}
        >
          {isLoading ? <div className="sp sp-circle"></div> : <AddIcon />}
        </button>
      </td>
    </tr>
  )
}

export default AddEntryRow
