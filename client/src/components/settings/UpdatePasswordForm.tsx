import FormBuilder from "@/components/FormBuilder"
import * as Yup from "yup"
import { Box, Spinner, useToast } from "@chakra-ui/react"
import { useContext } from "react"
import { GlobalContext } from "@/GlobalStateProvider"
import axios from "axios"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"

export const UpdatePasswordForm = () => {
  const { user } = useContext(GlobalContext)
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  return (
    <Box p={8} bg="white" shadow="base" rounded="lg" mx={-4}>
      {user ? (
        <FormBuilder
          fields={{
            currentPassword: {
              type: "password",
              label: "Current Password",
              validate: Yup.string().trim().required("Name is required"),
            },
            newPassword: {
              type: "password",
              label: "New Password",
              validate: Yup.string().trim().required("Password is required"),
              helperText: "Must contain at least 8 charecters.",
            },
          }}
          button={{
            label: "Update",
            className: "mt-6",
            loadingLabel: "Updating",
            colorScheme: "gray",
          }}
          mutation={(values: any) =>
            axios.patch(`/api/users/update-password`, values)
          }
          onSuccess={() => {
            toast({ status: "success", title: "Account updated!" })
          }}
          onError={(e) => {
            toast({ status: "error", title: e.response.data.message })
          }}
        />
      ) : (
        <Spinner />
      )}
    </Box>
  )
}
