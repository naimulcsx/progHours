import { useState } from "react"
import * as Yup from "yup"
import { useQueryClient } from "react-query"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { Box, IconButton, useToast } from "@chakra-ui/react"
import { EditIcon } from "@/components/Icons"
import PopupBuilder from "@/components/PopupBuilder"
import FormBuilder from "@/components/FormBuilder"
import { updateOJHandle } from "@/api/handle"

const EditHandle = ({ handle, onlineJudge }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  const client = useQueryClient()
  const toast = useToast(DEFAULT_TOAST_OPTIONS)

  return (
    <Box>
      <IconButton
        aria-label="edit handle button"
        variant={"outline"}
        border="none"
        color={"green.500"}
        icon={<EditIcon />}
        onClick={() => setIsOpen(true)}
      />

      <PopupBuilder
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Edit ${onlineJudge.name} handle`}
      >
        <FormBuilder
          isModal
          fields={{
            handle: {
              type: "text",
              label: "Handle",
              initialValue: handle,
              validate: Yup.string().trim(),
            },
            onlineJudge: {
              type: "select",
              label: "Select Online Judge",
              options: ["Codeforces", "CodeChef", "Toph", "LightOJ"],
              initialValue: onlineJudge.name,
              validate: Yup.string().trim(),
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

            return updateOJHandle(value)
          }}
          onSuccess={() => {
            client.invalidateQueries("handles")
            toast({
              status: "success",
              title: "handle edited",
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
      </PopupBuilder>
    </Box>
  )
}

export default EditHandle

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
