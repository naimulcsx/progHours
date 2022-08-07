import { addMember, createGroup } from "@/api/groups"
import { toast, useToast } from "@chakra-ui/react"
import FormBuilder from "../FormBuilder"
import PopupBuilder from "../PopupBuilder"
import * as yup from "yup"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { useMutation, useQueryClient } from "react-query"

export const AddUserToGroupModal = ({
  isOpen,
  setIsOpen,
  groupName,
  groupId,
  hashtag,
}: any) => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const queryClient = useQueryClient()
  return (
    <PopupBuilder
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={`Add Member [${groupName}]`}
    >
      <FormBuilder
        isModal
        fields={{
          username: {
            type: "textarea",
            label: "Username",
            placeholder: "eg: (C181059, C181065)",
            validate: yup.string(),
            // .trim()
            // .required("University ID is required")
            // .length(7, "Invalid University ID"),
          },
        }}
        mutation={addMember(groupId)}
        onSuccess={(res) => {
          queryClient.invalidateQueries(`groups/${hashtag}`)
          toast({ status: "success", title: res.message })
          setIsOpen(false)
        }}
        onError={(err) => {
          const errorMessage =
            err?.response?.data?.message || "Something went wrong!"
          toast({ status: "error", title: errorMessage })
        }}
        button={{
          label: "Add Member",
          className: "mt-6",
          loadingLabel: "Adding...",
        }}
      />
    </PopupBuilder>
  )
}
