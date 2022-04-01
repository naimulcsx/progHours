import SettingsLayout from "@/components/SettingsLayout"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ErrorMessage, FormControl, Input, Label } from "@/components/Form"
import { Helmet } from "react-helmet-async"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { createOJHandle, getAllHandles } from "@/api/handle"
import showErrorToasts from "@/utils/showErrorToasts"
import { toast } from "react-toastify"

const profileSchema = Yup.object().shape({
  handle: Yup.string().trim().required("handle name is required"),
  onlineJudge: Yup.string().required("online judge is required"),
})

const EditProfile = () => {
  const [handles, setHandles] = useState([])

  const formik = useFormik({
    initialValues: {
      handle: "",
      onlineJudge: "1",
    },
    validationSchema: profileSchema,

    onSubmit: (values) => {
      const val = {
        handle: values.handle,
        judge_id: parseInt(values.onlineJudge, 10),
      }
      mutate(val)
    },
  })

  const client = useQueryClient()
  client.invalidateQueries("handles")

  const { mutate } = useMutation(createOJHandle, {
    onSuccess: () => {
      formik.resetForm()
      toast.success("create successfully")
    },

    onError: (err: any) => {
      showErrorToasts(err.response.data.message)
    },
  })

  useQuery("handles", getAllHandles, {
    refetchOnWindowFocus: false,

    onSuccess: (data) => {
      setHandles(data?.handles)
    },
  })

  return (
    <SettingsLayout>
      <Helmet>
        <title>Settings</title>
      </Helmet>

      <form className="space-y-12" onSubmit={formik.handleSubmit}>
        {/* edit profile: online judge handles */}
        <div className="space-y-6">
          <h3 className="mb-8">Online Judge Handles</h3>

          <div className="space-y-6">
            {handles.length > 0 ? (
              handles.map((item) => (
                <FormControl key={item.id}>
                  <Input
                    type="text"
                    placeholder=" "
                    value={item.handle}
                    readOnly
                  />
                  <Label>{item.judge_id.name}</Label>
                </FormControl>
              ))
            ) : (
              <div></div>
            )}
          </div>

          <div className="flex items-center pt-10 space-x-5">
            <div className="flex-1">
              <FormControl
                isInvalid={formik.touched.handle && formik.errors.handle}
              >
                <Input
                  type="text"
                  placeholder=" "
                  {...formik.getFieldProps("handle")}
                />
                <Label>Handle name</Label>
                <ErrorMessage>{formik.errors.handle}</ErrorMessage>
              </FormControl>
            </div>

            <FormControl
              isInvalid={
                formik.touched.onlineJudge && formik.errors.onlineJudge
              }
            >
              <select
                {...formik.getFieldProps("onlineJudge")}
                className="w-full p-3 border-2 border-gray-200 rounded-md focus:outline-none"
              >
                <option value="1">CodeForces</option>
                <option value="2">CodeChef</option>
                <option value="3">CSES</option>
                <option value="4">UVa</option>
                <option value="5">Toph</option>
                <option value="6">SPOJ</option>
                <option value="7">Hackerrank</option>
              </select>
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
    </SettingsLayout>
  )
}

export default EditProfile
