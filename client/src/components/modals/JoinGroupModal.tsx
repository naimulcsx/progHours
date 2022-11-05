import { createGroup, joinGroup } from "~/api/groups"
import { toast, useToast } from "@chakra-ui/react"
import FormBuilder from "../FormBuilder"
import PopupBuilder from "../PopupBuilder"
import * as yup from "yup"
import { DEFAULT_TOAST_OPTIONS } from "~/configs/toast-config"
import { useQuery, useQueryClient } from "react-query"

export const JoinGroupModal = ({ isOpen, setIsOpen }: any) => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const queryClient = useQueryClient()
  return (
    <PopupBuilder
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Join a Group"
      description="Please enter the access code for a group"
    >
      <FormBuilder
        isModal
        fields={{
          accessCode: {
            type: "text",
            label: "Access Code",
            validate: yup.string().trim().required("Access Code is required"),
          },
        }}
        mutation={(values: any) => joinGroup(values)}
        onSuccess={() => {
          toast({ status: "success", title: "Group joined!" })
          queryClient.invalidateQueries("groups")
          setIsOpen(false)
        }}
        onError={(err) => {
          const errorMessage =
            err?.response?.data?.message || "Something bad happened!"
          toast({ status: "error", title: errorMessage })
        }}
        button={{
          label: "Join",
          className: "mt-6",
          loadingLabel: "Joining...",
        }}
      />
    </PopupBuilder>
  )
}
