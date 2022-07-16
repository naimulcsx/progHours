import { useState } from "react"
import FormBuilder from "../FormBuilder"
import * as Yup from "yup"
import { useQueryClient } from "react-query"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { Box, IconButton, useToast } from "@chakra-ui/react"
import { EditIcon } from "../Icons"
import PopupBuilder from "../PopupBuilder"
import moment from "moment"
import { updateUserStudy } from "@/api/userStudies"

const EditStudyList = ({ item }: any) => {
  const { title, id } = item
  const [isOpen, setIsOpen] = useState(false)
  console.log(title, id)

  const client = useQueryClient()
  const toast = useToast(DEFAULT_TOAST_OPTIONS)

  return (
    <Box>
      <IconButton
        aria-label="edit study button"
        variant={"outline"}
        border="none"
        color={"green.500"}
        icon={<EditIcon />}
        onClick={() => setIsOpen(true)}
      />

      <PopupBuilder
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Edit ${title}`}
      >
        <FormBuilder
          isModal
          fields={{
            title: {
              type: "text",
              initialValue: item?.title,
              label: "Title",
              validate: Yup.string().trim(),
            },

            type: {
              type: "select",
              label: "Type",
              options: ["Article", "Video"],
              initialValue: `${item?.type}`,
              validate: Yup.string().trim(),
            },
            link: {
              type: "text",
              label: "Link",
              initialValue: item?.link,
              validate: Yup.string().trim(),
            },
            studyTime: {
              type: "number",
              label: "Study Time",
              initialValue: item?.studyTime,
              validate: Yup.string().trim(),
            },
            studyDate: {
              type: "date",
              label: "Study Date",
              initialValue: moment(item?.studyDate).format("YYYY-MM-DD"),
              validate: Yup.string().trim(),
            },
            difficulty: {
              type: "select",
              label: "Difficulty",
              options: ["Beginner", "Intermediate", "Advanced"],
              initialValue: `${item?.difficulty}`,
              validate: Yup.string().trim(),
            },
            language: {
              type: "select",
              label: "Language",
              options: ["English", "Bengali"],
              initialValue: `${item?.language}`,
              validate: Yup.string().trim(),
            },
          }}
          mutation={(values: any) => {
            const value = {
              ...values,
              studyDate: moment(values.studyDate).format(),
            }
            console.log("---", { values, value })
            return updateUserStudy(id, value)
          }}
          onSuccess={() => {
            client.invalidateQueries("studies")
            toast({
              status: "success",
              title: "study list updated",
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
      </PopupBuilder>
    </Box>
  )
}

export default EditStudyList
