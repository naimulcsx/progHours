import FormBuilder from "../FormBuilder"
import * as Yup from "yup"
import { useQueryClient } from "react-query"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { useToast } from "@chakra-ui/react"
import { createUserStudy, updateUserStudy } from "@/api/userStudies"
import moment from "moment"

export default function StudyForm({ setIsOpen, studies, isCreate }: any) {
  const client = useQueryClient()
  const toast = useToast(DEFAULT_TOAST_OPTIONS)

  return (
    <FormBuilder
      isModal
      fields={{
        title: {
          type: "text",
          label: "Title",
          initialValue: studies?.title,
          validate: Yup.string().trim().required("Title is required"),
        },

        type: {
          type: "select",
          label: "Type",
          options: ["Article", "Video"],
          initialValue: studies ? studies.type : "Article",
          validate: Yup.string().trim().required("Resource type is required"),
        },
        link: {
          type: "text",
          label: "Link",
          initialValue: studies?.link,
          validate: Yup.string()
            .url()
            .trim()
            .required("Resource link is required"),
        },
        studyTime: {
          type: "number",
          label: "Study Time",
          initialValue: studies?.studyTime,
          validate: Yup.string().trim().required("Study time is required"),
        },
        studyDate: {
          type: "date",
          label: "Study Date",
          initialValue: studies
            ? moment(studies.studyDate).format("YYYY-MM-DD")
            : "",
          validate: Yup.string().trim().required("Date of study is required"),
        },
        difficulty: {
          type: "select",
          label: "Difficulty",
          options: ["Beginner", "Intermediate", "Advanced"],
          initialValue: studies ? studies.difficulty : "Beginner",
          validate: Yup.string()
            .trim()
            .required("Resource difficulty is required"),
        },
        language: {
          type: "select",
          label: "Language",
          options: ["English", "Bengali"],
          initialValue: studies ? studies.language : "English",
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
        return isCreate
          ? createUserStudy(value)
          : updateUserStudy(studies.id, value)
      }}
      onSuccess={() => {
        client.invalidateQueries("studies")
        isCreate
          ? toast({
              status: "success",
              title: "new study added",
            })
          : toast({
              status: "success",
              title: "study updated",
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
        loadingLabel: "Saving...",
      }}
    />
  )
}
