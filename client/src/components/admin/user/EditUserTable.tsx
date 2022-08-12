import FormBuilder from "@/components/FormBuilder"
import PopupBuilder from "@/components/PopupBuilder"
import { useState } from "react"
import * as Yup from "yup"
import { useQueryClient } from "react-query"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { Box, Button, IconButton, useToast } from "@chakra-ui/react"
import { PencilAltIcon } from "@heroicons/react/outline"
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
        p={1}
        color="green.500"
        aria-label="Edit User Button"
        border={"none"}
        onClick={() => setIsOpen(true)}
        icon={<PencilAltIcon width={22} height={22} />}
      />

      {/* <Button onClick={() => setIsOpen(true)} p={1} variant="outline" colorScheme={}>
        <PencilIcon width={20} height={20} />
      </Button> */}

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
