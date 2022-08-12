import FormBuilder from "@/components/FormBuilder"
import PopupBuilder from "@/components/PopupBuilder"
import { useState } from "react"
import * as Yup from "yup"
import { useQueryClient } from "react-query"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { Box, IconButton, useToast } from "@chakra-ui/react"
import { PencilIcon } from "@heroicons/react/solid"
import { udpateUserData } from "@/api/user"

export default function EditUserTable(cell: any) {
  const [isOpen, setIsOpen] = useState(false)

  const client = useQueryClient()
  const toast = useToast(DEFAULT_TOAST_OPTIONS)

  const { id, name, username, email, batch, department, mobile, role, cgpa } =
    cell.row.original

  return (
    <Box>
      <IconButton
        variant="outline"
        colorScheme="teal"
        aria-label="Call Sage"
        fontSize="20px"
        icon={<PencilIcon width={24} height={24} />}
        onClick={() => setIsOpen(true)}
      />

      <PopupBuilder
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Edit information for ${name}`}
      >
        <FormBuilder
          isModal
          fields={{
            username: {
              type: "text",
              label: "University ID",
              initialValue: username,
              validate: Yup.string().trim().required("ID is required"),
            },

            name: {
              type: "text",
              label: "Name",
              initialValue: name,
              validate: Yup.string().trim().required("Name is required"),
            },
            email: {
              type: "text",
              label: "Email Address",
              initialValue: email,
              validate: Yup.string()
                .email("Invalid email")
                .trim()
                .required("Email is required"),
            },
            batch: {
              type: "text",
              label: "Batch",
              initialValue: batch,
              validate: Yup.string().trim(),
            },
            department: {
              type: "text",
              label: "Department",
              initialValue: department,
              validate: Yup.string().trim(),
            },
            mobile: {
              type: "text",
              label: "Mobile No.",
              initialValue: mobile,
              validate: Yup.string().trim(),
            },
            cgpa: {
              type: "text",
              label: "CGPA",
              initialValue: cgpa,
              validate: Yup.string().trim(),
            },
            role: {
              type: "select",
              label: "Role",
              options: ["ADMIN", "MODERATOR", "USER"],
              initialValue: role,
              validate: Yup.string().trim().required("Role is required"),
            },
          }}
          mutation={(values: any) => {
            const body = {
              id,
              ...values,
            }

            return udpateUserData(body)
          }}
          onSuccess={() => {
            client.invalidateQueries("users")

            toast({
              status: "success",
              title: "user updated",
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
            label: "Update",
            className: "mt-6",
            loadingLabel: "Updating...",
          }}
        />
      </PopupBuilder>
    </Box>
  )
}
