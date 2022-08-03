import FormBuilder from "@/components/FormBuilder"
import * as Yup from "yup"
import {
  Box,
  Spinner,
  useColorModeValue as mode,
  useToast,
} from "@chakra-ui/react"
import { useContext } from "react"
import { GlobalContext } from "@/GlobalStateProvider"
import axios from "axios"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { useQueryClient } from "react-query"

export const GeneralInformationForm = () => {
  const { user } = useContext(GlobalContext)
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const queryClient = useQueryClient()
  return (
    <Box
      p={[4, 4, 4, 8]}
      bg={mode("white", "gray.800")}
      shadow="base"
      rounded="lg"
      mx={-4}
    >
      {user ? (
        <FormBuilder
          fields={{
            name: {
              type: "text",
              label: "Full Name",
              validate: Yup.string().trim().required("Name is required"),
              initialValue: user.name,
            },
            email: {
              type: "text",
              label: "Email",
              validate: Yup.string()
                .trim()
                .required("Email is required")
                .email("Invalid email"),
              initialValue: user.email,
            },
            mobile: {
              type: "text",
              label: "Mobile",
              validate: Yup.string().trim(),
              initialValue: user.mobile,
            },
            username: {
              type: "text",
              label: "University ID",
              validate: Yup.string()
                .trim()
                .required("University ID is required")
                .length(7, "Invalid University ID"),
              initialValue: user.username.toUpperCase(),
              disabled: true,
            },
            department: {
              type: "select",
              label: "Department",
              placeholder: "Select",
              options: [
                ["Computer Science and Engineering (CSE)", "CSE"],
                ["Computer and Communication Engineering (CCE)", "CCE"],
                ["Electrical and Electronic Engineering (EEE)", "EEE"],
              ],
              validate: Yup.string().trim(),
              initialValue: user.department,
            },
            batch: {
              type: "number",
              label: "Batch",
              validate: Yup.string().trim(),
              initialValue: user.batch ? user.batch.toString() : "",
            },
            cgpa: {
              type: "number",
              label: "CGPA",
              validate: Yup.string().trim(),
              initialValue: user.cgpa ? user.cgpa.toString() : "",
            },
          }}
          button={{
            label: "Update",
            loadingLabel: "Updating",
            colorScheme: "gray",
          }}
          mutation={(values: any) => {
            return axios.patch(`/api/users/me?update=data`, values)
          }}
          onSuccess={() => {
            queryClient.invalidateQueries("user")
            toast({ status: "success", title: "Account updated!" })
          }}
          onError={() => {
            toast({ status: "error", title: "Some error occurred!" })
          }}
        />
      ) : (
        <Spinner />
      )}
    </Box>
  )
}
