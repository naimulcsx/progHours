import * as Yup from "yup"
import React, { useState } from "react"
import { useFormik } from "formik"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { useQueryClient, useMutation } from "react-query"
import { FormControl, Select, Option, Input } from "@/components/Form"
import { AddIcon } from "../Icons"
import moment from "moment"

/**
 * Import utils
 */
import showErrorToasts from "@/utils/showErrorToasts"
import { createSubmission } from "@/api/submissions"

/**
 * Date picker component and styles
 */
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "@/styles/datepicker.css"

const submissionSchema = Yup.object().shape({
  link: Yup.string().trim().required("Problem link is required"),
  solve_time: Yup.number().required("Solve time is required"),
  verdict: Yup.string().required("Verdict is required"),
  solved_at: Yup.date().required("Date is required"),
})

const AddEntryRow = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()

  /**
   * Create submission mutation
   */
  const createSubmissionMutation = useMutation(createSubmission, {
    onSuccess: (data) => {
      formik.resetForm()
      queryClient.invalidateQueries("practice")
      toast.success("Problem submitted successfully")
    },
    onError: (err: AxiosError) => {
      showErrorToasts(err.response?.data.message)
    },
  })

  /**
   * Default selected state
   */
  const [selected, setSelected] = useState("AC")

  const formik = useFormik({
    initialValues: {
      link: "",
      solve_time: 0,
      verdict: "AC",
      solved_at: new Date(),
    },
    validationSchema: submissionSchema,
    onSubmit: async (values) => {
      /**
       * Convert values.solve_time to number
       */
      const solveTimeString: string = values.solve_time.toString()
      values.solve_time = parseInt(solveTimeString)

      console.log(values)

      /**
       * Create the submission
       */
      createSubmissionMutation.mutate(values)
    },
  })

  /**
   * On change handler for Select component
   */
  const handleSelected = (value: string) => {
    setSelected(value)
    formik.setFieldValue("verdict", value)
  }

  /**
   * On submit handler for the form element
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fields = Object.keys(formik.errors) as Array<
      "link" | "solve_time" | "verdict" | "solved_at"
    >
    if (fields.length === 0) {
      formik.handleSubmit()
      return
    }
    fields.forEach((el) => {
      toast.error(formik.errors[el], {
        className: "toast",
        toastId: formik.errors[el] as string,
      })
    })
  }

  return (
    <tr className="bg-white">
      <td className="border-b" data-serial>
        {id}
      </td>
      <td className="border-b" data-problem-name>
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
      <td className="border-b" data-verdict>
        <Select value={selected} onChange={handleSelected}>
          <Option value="AC">AC</Option>
          <Option value="WA">WA</Option>
          <Option value="TLE">TLE</Option>
          <Option value="RTE">RTE</Option>
          <Option value="MLE">MLE</Option>
        </Select>
      </td>
      <td className="border-b" data-solve_time>
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
      </td>

      <td className="border-b" data-tags>
        —
      </td>
      <td className="border-b">—</td>
      <td className="border-b" data-solved_at>
        <ReactDatePicker
          dateFormat="EEE, dd MMM yyyy"
          className="h-[40px] px-3 focus:outline-none rounded focus:ring-2 ring-primary ring-opacity-50"
          selected={formik.values.solved_at}
          onChange={(date) => {
            const currentDate = new Date()
            const dateToSend = moment(date)
              .set("hour", currentDate.getHours())
              .set("minute", currentDate.getMinutes())
              .set("second", currentDate.getSeconds())
              .set("millisecond", currentDate.getMilliseconds())
            formik.setFieldValue("solved_at", dateToSend.toDate())
          }}
        />
      </td>
      <td className="border-b" data-actions>
        <button
          form="add-submission"
          type="submit"
          className="flex items-center px-1 py-1 space-x-2 border rounded"
        >
          {createSubmissionMutation.isLoading ? (
            <div className="sp sp-circle"></div>
          ) : (
            <AddIcon />
          )}
        </button>
      </td>
    </tr>
  )
}

export default AddEntryRow
