import FormBuilder from "../FormBuilder"
import * as Yup from "yup"
import { Button, useToast } from "@chakra-ui/react"
import { PlusIcon } from "../Icons"
import { createOJHandle } from "@/api/handle"
import { useQueryClient } from "react-query"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { useState } from "react"
import PopupBuilder from "../PopupBuilder"

const HandleForm = () => {
  const client = useQueryClient()

  const [isOpen, setIsOpen] = useState(false)
  const toast = useToast(DEFAULT_TOAST_OPTIONS)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
        New
      </Button>

      <PopupBuilder
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add a new handle"
      >
        <FormBuilder
          className="px-8 pb-8 mt-6"
          fields={{
            handle: {
              type: "text",
              label: "Handle",
              validate: Yup.string().trim().required("Handle is required"),
            },
            judge_id: {
              type: "select",
              label: "Select Online Judge",
              options: ["Codeforces", "CodeChef", "Toph", "LightOJ"],
              initialValue: "Codeforces",
              validate: Yup.string()
                .trim()
                .required("Online Judge is required"),
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
              judge_id: judge[values.judge_id],
            }

            return createOJHandle(value)
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
      </PopupBuilder>
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
  judge_id: "Codeforces" | "CodeChef" | "Toph" | "LightOJ"
}
