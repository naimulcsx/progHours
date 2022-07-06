import FormBuilder from "../FormBuilder"
import * as Yup from "yup"

export default function StudyForm() {
  return (
    <FormBuilder
      className="px-8 pb-8 mt-6 space-y-4"
      fields={{
        title: {
          type: "text",
          label: "Title",
          validate: Yup.string().trim().required("Title is required"),
        },

        resourceType: {
          type: "select",
          label: "Type",
          options: ["Article", "video"],
          initialValue: "Article",
          validate: Yup.string().trim().required("Resource type is required"),
        },
        link: {
          type: "text",
          label: "Link",
          validate: Yup.string().trim().required("Resource link is required"),
        },
        study_time: {
          type: "text",
          label: "Study Time",
          validate: Yup.string().trim().required("Study time is required"),
        },
        studied_at: {
          type: "date",
          label: "Study Date",
          validate: Yup.string().trim().required("Password is required"),
        },
        difficulty: {
          type: "select",
          label: "Type",
          options: ["Beginner", "Intermediate", "Advanced"],
          initialValue: "Beginner",
          validate: Yup.string()
            .trim()
            .required("Resource difficulty is required"),
        },
        language: {
          type: "select",
          label: "Type",
          options: ["English", "Bengali"],
          initialValue: "English",
          validate: Yup.string()
            .trim()
            .required("Resource language is required"),
        },
      }}
      mutation={() => {}}
      onSuccess={(data) => {}}
      onError={(err) => {}}
      button={{
        label: "Add Study",
        className: "mt-6",
        loadingLabel: "Adding Study",
      }}
    />
  )
}
