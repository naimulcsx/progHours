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
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { createOJHandle, deleteHandle, getAllHandles } from "@/api/handle"
import showErrorToasts from "@/utils/showErrorToasts"
import toast from "react-hot-toast"
import { ExternalLinkIcon, TrashIcon } from "@heroicons/react/solid"
import { CCIcon, CFIcon, LightOJIcon, OpenLinkIcon, TophIcon } from "../Icons"
import { Link } from "react-router-dom"

interface OJ {
  Codeforces: number
  CodeChef: number
  Toph: number
  LightOJ: number
}

interface HandleState {
  handle: string
  onlineJudge: "Codeforces" | "CodeChef" | "Toph" | "LightOJ"
}

const profileSchema = Yup.object().shape({
  handle: Yup.string().trim().required("Handle is required"),
  onlineJudge: Yup.string().required("Online judge is required"),
})

const HandleSettings = () => {
  const [handles, setHandles] = useState([])

  const formik = useFormik({
    initialValues: {
      handle: "",
      onlineJudge: "Codeforces",
    },
    validationSchema: profileSchema,

    onSubmit: (values: HandleState) => {
      const judge: OJ = {
        Codeforces: 1,
        CodeChef: 2,
        Toph: 5,
        LightOJ: 8,
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
      setHandles(data?.handles)
    },
  })

  /**
   * Handle delete
   */
  const { mutate: handleMutate } = useMutation(deleteHandle, {
    onSuccess() {
      client.invalidateQueries("handles")
      toast.success("Deleted successfully")
    },

    onError: (err: any) => {
      showErrorToasts(err.response.data.message)
    },
  })

  /**
   * Get user online judge profile
   */
  const getProfileURL = (oj: string, handle: string) => {
    switch (oj) {
      case "Codeforces":
        return `https://codeforces.com/profile/${handle}`
      case "Toph":
        return `https://toph.co/u/${handle}`
      case "LightOJ":
        return `https://lightoj.com/user/${handle}`
      case "CodeChef":
        return `https://www.codechef.com/users/${handle}`
      default:
        return ""
    }
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <form className="space-y-8" onSubmit={formik.handleSubmit}>
        {/* edit profile: online judge handles */}
        <div className="space-y-6">
          <h4 className="mb-8">Online Judge Handles</h4>
          <div className="">
            {handles.length > 0 && (
              <div>
                <div className="px-8 py-3 -mx-8 text-sm uppercase bg-gray-100 border-t border-b">
                  <div className="flex justify-between">
                    <span>Handle</span>
                    <span>Action</span>
                  </div>
                </div>
                {handles.map((item: any) => {
                  const iconMap = {
                    Codeforces: <CFIcon />,
                    CodeChef: <CCIcon />,
                    Toph: <TophIcon />,
                    LightOJ: <LightOJIcon />,
                  }

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-8 py-2.5 -mx-8 border-b"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6">
                          {iconMap[item.judge_id.name]}
                        </div>
                        <a
                          href={getProfileURL(item.judge_id.name, item.handle)}
                          target="_blank"
                          className="flex items-center space-x-1 text-blue-500 border-b border-blue-400"
                        >
                          <span>{item.handle}</span>
                          <ExternalLinkIcon className="w-4 h-4" />
                        </a>
                      </div>
                      <button
                        className="w-5 h-5 text-red-500"
                        onClick={() => handleMutate(item.judge_id.id)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="flex space-x-5">
            <div className="flex-1">
              <FormControl
                isInvalid={formik.touched.handle && !!formik.errors.handle}
              >
                <Label htmlFor="handle">Handle</Label>
                <Input
                  id="handle"
                  type="text"
                  {...formik.getFieldProps("handle")}
                />
                <ErrorMessage>{formik.errors.handle}</ErrorMessage>
              </FormControl>
            </div>

            <FormControl
              isInvalid={
                formik.touched.onlineJudge && !!formik.errors.onlineJudge
              }
            >
              <Label htmlFor="oj">Judge</Label>
              <Select
                {...formik.getFieldProps("onlineJudge")}
                value={formik.values.onlineJudge}
                onChange={(value: string) =>
                  formik.setFieldValue("onlineJudge", value)
                }
              >
                <Option value="CodeForces">Codeforces</Option>
                <Option value="CodeChef">CodeChef</Option>
                <Option value="Toph">Toph</Option>
                <Option value="LightOJ">LightOJ</Option>
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

export default HandleSettings
