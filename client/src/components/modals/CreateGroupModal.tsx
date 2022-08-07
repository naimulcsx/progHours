import { createGroup } from "@/api/groups"
import { toast, useToast } from "@chakra-ui/react"
import FormBuilder from "../FormBuilder"
import PopupBuilder from "../PopupBuilder"
import * as yup from "yup"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { useQueryClient } from "react-query"

export const CreateGroupModal = ({ isOpen, setIsOpen }: any) => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const queryClient = useQueryClient()
  return (
    <PopupBuilder
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Create new group"
    >
      <FormBuilder
        isModal
        fields={{
          name: {
            type: "text",
            label: "Group Name",
            validate: yup.string().trim().required("Group Name is required"),
          },
          hashtag: {
            type: "text",
            label: "Hashtag",
            leftAddon: "#",
            validate: yup.string().trim().required("Group tag is required"),
          },
        }}
        mutation={(values: any) => createGroup(values)}
        onSuccess={() => {
          toast({ status: "success", title: "Group created!" })
          queryClient.invalidateQueries("groups")
          setIsOpen(false)
        }}
        onError={(err) => {
          const errorMessage =
            err?.response?.data?.message || "Something bad happened!"
          toast({ status: "error", title: errorMessage })
        }}
        button={{
          label: "Save",
          className: "mt-6",
          loadingLabel: "Saving...",
        }}
      />
    </PopupBuilder>
  )
}
