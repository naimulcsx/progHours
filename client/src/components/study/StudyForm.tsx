import FormBuilder from "../FormBuilder"
import * as Yup from "yup"
import { useQueryClient } from "react-query"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { useToast } from "@chakra-ui/react"
import { createUserStudy } from "@/api/userStudies"
import moment from "moment"

export default function StudyForm({ setIsOpen }: any) {
  const client = useQueryClient()
  const toast = useToast(DEFAULT_TOAST_OPTIONS)

  return (
    <FormBuilder
      isModal
      fields={{
        title: {
          type: "text",
          label: "Title",
          validate: Yup.string().trim().required("Title is required"),
        },

        type: {
          type: "select",
          label: "Type",
          options: ["Article", "Video"],
          initialValue: "Article",
          validate: Yup.string().trim().required("Resource type is required"),
        },
        link: {
          type: "text",
          label: "Link",
          validate: Yup.string().trim().required("Resource link is required"),
        },
        studyTime: {
          type: "number",
          label: "Study Time",
          validate: Yup.string().trim().required("Study time is required"),
        },
        studyDate: {
          type: "date",
          label: "Study Date",
          validate: Yup.string().trim().required("Date of study is required"),
        },
        difficulty: {
          type: "select",
          label: "Difficulty",
          options: ["Beginner", "Intermediate", "Advanced"],
          initialValue: "Beginner",
          validate: Yup.string()
            .trim()
            .required("Resource difficulty is required"),
        },
        language: {
          type: "select",
          label: "Language",
          options: ["English", "Bengali"],
          initialValue: "English",
          validate: Yup.string()
            .trim()
            .required("Resource language is required"),
        },
      }}
      mutation={(values: any) => {
        const value = {
          ...values,
          studyDate: moment(values.studyDate).format(),
        }
        return createUserStudy(value)
      }}
      onSuccess={() => {
        client.invalidateQueries("studies")
        toast({
          status: "success",
          title: "new list added",
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
        label: "Add Study",
        className: "mt-6",
        loadingLabel: "Adding Study",
      }}
    />
  )
}
