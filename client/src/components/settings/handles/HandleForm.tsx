import FormBuilder from "../../FormBuilder"
import * as Yup from "yup"
import { useToast } from "@chakra-ui/react"
import { createOJHandle, updateOJHandle } from "@/api/handle"
import { useQueryClient } from "react-query"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"

const HandleForm = ({ setIsOpen, isCreate, handle, onlineJudge }: any) => {
  const client = useQueryClient()
  const toast = useToast(DEFAULT_TOAST_OPTIONS)

  return (
    <>
      <FormBuilder
        isModal
        fields={{
          handle: {
            type: "text",
            label: "Handle",
            validate: Yup.string().trim().required("Handle is required"),
            initialValue: handle || "",
          },
          onlineJudge: {
            type: "select",
            label: "Select Online Judge",
            options: ["Codeforces", "CodeChef", "Toph", "LightOJ"],
            initialValue: onlineJudge?.name || "Codeforces",
            validate: Yup.string().trim().required("Online Judge is required"),
          },
        }}
        mutation={(values: HandleState) => {
          const judge: OJ = {
            Codeforces: 1,
            CodeChef: 2,
            Toph: 5,
            LightOJ: 8,
          }

          const value = {
            handle: values.handle,
            onlineJudgeId: judge[values.onlineJudge],
          }

          return isCreate ? createOJHandle(value) : updateOJHandle(value)
        }}
        onSuccess={() => {
          client.invalidateQueries("handles")
          toast({
            status: "success",
            title: "new handle added",
          })
          setIsOpen(false)
        }}
        onError={(err) => {
          toast({
            status: "error",
            title: err.response.data.message,
          })
          setIsOpen(false)
        }}
        button={{
          label: "Save",
          className: "mt-6",
          loadingLabel: "Saving",
        }}
      />
    </>
  )
}

export default HandleForm

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
