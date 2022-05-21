import { SettingsLayout } from "@/components/layouts/Settings"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  ErrorMessage,
  FormControl,
  Input,
  Label,
  Select,
  Option,
} from "@/components/Form"
import { Helmet } from "react-helmet-async"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { createOJHandle, getAllHandles } from "@/api/handle"
import showErrorToasts from "@/utils/showErrorToasts"
import toast from "react-hot-toast"
import { DashboardLayout } from "@/components/layouts/Dashboard"

interface OJ {
  CodeForces: number
  CodeChef: number
  CSES: number
  UVa: number
  Toph: number
  SPOJ: number
  Hackerrank: number
}

interface HandleState {
  handle: string
  onlineJudge:
    | "CodeForces"
    | "CodeChef"
    | "CSES"
    | "UVa"
    | "Toph"
    | "SPOJ"
    | "Hackerrank"
}

const profileSchema = Yup.object().shape({
  handle: Yup.string().trim().required("handle name is required"),
  onlineJudge: Yup.string().required("online judge is required"),
})

const EditProfile = () => {
  const [handles, setHandles] = useState([])

  const formik = useFormik({
    initialValues: {
      handle: "",
      onlineJudge: "CodeForces",
    },
    validationSchema: profileSchema,

    onSubmit: (values: HandleState) => {
      const judge: OJ = {
        CodeForces: 1,
        CodeChef: 2,
        CSES: 3,
        UVa: 4,
        Toph: 5,
        SPOJ: 6,
        Hackerrank: 7,
      }

      const val = {
        handle: values.handle,
        judge_id: judge[values.onlineJudge],
      }
      mutate(val)
    },
  })

  const client = useQueryClient()

  const { mutate } = useMutation(createOJHandle, {
    onSuccess: () => {
      formik.resetForm()
      client.invalidateQueries("handles")
      toast.success("create successfully")
    },

    onError: (err: any) => {
      showErrorToasts(err.response.data.message)
    },
  })

  useQuery("handles", getAllHandles, {
    onSuccess: (data) => {
      console.log(data)
      setHandles(data?.handles)
    },
  })

  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <form className="space-y-8" onSubmit={formik.handleSubmit}>
        {/* edit profile: online judge handles */}
        <div className="space-y-6">
          <h4 className="mb-8">Online Judge Handles</h4>
          <div className="space-y-6">
            {handles.length > 0 ? (
              handles.map((item: any) => (
                <FormControl key={item.id}>
                  <Label>{item.judge_id.name}</Label>
                  <Input type="text" value={item.handle} readOnly />
                </FormControl>
              ))
            ) : (
              <div></div>
            )}
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex-1">
              <FormControl
                isInvalid={formik.touched.handle && !!formik.errors.handle}
              >
                <Label>Handle name</Label>
                <Input type="text" {...formik.getFieldProps("handle")} />
                <ErrorMessage>{formik.errors.handle}</ErrorMessage>
              </FormControl>
            </div>

            <FormControl
              isInvalid={
                formik.touched.onlineJudge && !!formik.errors.onlineJudge
              }
            >
              <Label>Judge</Label>
              <Select
                {...formik.getFieldProps("onlineJudge")}
                value={formik.values.onlineJudge}
                onChange={(value: string) =>
                  formik.setFieldValue("onlineJudge", value)
                }
              >
                <Option value="CodeForces">Codeforces</Option>
                <Option value="CodeChef">CodeChef</Option>
                <Option value="CSES">CSES</Option>
                <Option value="UVa">UVa</Option>
                <Option value="Toph">Toph</Option>
                <Option value="SPOJ">SPOJ</Option>
                <Option value="Hackerrank">Hackerrank</Option>
              </Select>

              <ErrorMessage>{formik.errors.onlineJudge}</ErrorMessage>
            </FormControl>
          </div>
        </div>

        {/* save buttons */}
        <div className="flex items-center justify-end space-x-6">
          <button className="btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
