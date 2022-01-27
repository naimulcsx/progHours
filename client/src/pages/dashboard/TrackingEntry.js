import Dashboardlayout from "components/DashboardLayout"
import { useState } from "react"
import * as Yup from "yup"
import { useFormik } from "formik"
import {
  FormControl,
  Select,
  Option,
  Input,
  Label,
  ErrorMessage,
} from "components/Form"

const submissionSchema = Yup.object().shape({
  link: Yup.string().trim().required("Problem link is required"),
  solveTime: Yup.number().required("Solve time is required"),
  verdict: Yup.string().required("Verdict is required"),
})

export default function TrackingEntry() {
  const formik = useFormik({
    initialValues: {
      link: "",
      solveTime: "",
      verdict: "",
    },
    onSubmit: async (values) => {
      console.log(values)
    },
  })

  const [selected, setSelected] = useState("AC")
  const handleSelected = (value) => {
    setSelected(value)
    formik.setFieldValue("verdict", value)
  }

  return (
    <Dashboardlayout>
      <div className="pt-28">
        {/* tracking table header */}
        <div className="flex items-center justify-between">
          <h3>New Submission</h3>
        </div>
        {/* tracking form */}
        <div className="max-w-3xl p-8 mt-10 bg-white rounded-lg shadow">
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <FormControl isInvalid={formik.touched.link && formik.errors.link}>
              <Input
                type="text"
                placeholder=" "
                {...formik.getFieldProps("link")}
              ></Input>
              <Label>Problem Link</Label>
              <ErrorMessage>{formik.errors.link}</ErrorMessage>
            </FormControl>

            <div className="grid grid-cols-2 gap-10">
              <FormControl
                isInvalid={formik.touched.solveTime && formik.errors.solveTime}
              >
                <Input
                  type="text"
                  placeholder=" "
                  {...formik.getFieldProps("solveTime")}
                ></Input>
                <Label>SolveTime</Label>
                <ErrorMessage>{formik.errors.solveTime}</ErrorMessage>
              </FormControl>

              <FormControl>
                <Select value={selected} onChange={handleSelected}>
                  <Option value="AC">AC</Option>
                  <Option value="WA">WA</Option>
                  <Option value="TLE">TLE</Option>
                  <Option value="RTE">RTE</Option>
                  <Option value="MLE">MLE</Option>
                </Select>
              </FormControl>
            </div>
            <div>
              <button type="submit" className="block mt-6 btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboardlayout>
  )
}
