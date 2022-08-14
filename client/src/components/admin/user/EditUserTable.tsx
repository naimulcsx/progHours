import FormBuilder from "@/components/FormBuilder"
import PopupBuilder from "@/components/PopupBuilder"
import { useState } from "react"
import * as Yup from "yup"
import { useQueryClient } from "react-query"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { Box, Button, useToast } from "@chakra-ui/react"
import { PencilAltIcon } from "@heroicons/react/outline"
import { udpateUserData } from "@/api/user"

export default function EditUserTable(cell: any) {
  const [isOpen, setIsOpen] = useState(false)

  const client = useQueryClient()
  const toast = useToast(DEFAULT_TOAST_OPTIONS)

  const {
    id,
    name,
    username,
    email,
    section,
    batch,
    department,
    mobile,
    role,
    cgpa,
  } = cell.row.original

  return (
    <Box>
      <Button
        variant="outline"
        size="xs"
        colorScheme="green"
        aria-label="Edit User Button"
        onClick={() => setIsOpen(true)}
      >
        <PencilAltIcon width={16} height={16} />
      </Button>
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
              initialValue: username || "",
              validate: Yup.string().trim(),
            },
            name: {
              type: "text",
              label: "Name",
              initialValue: name || "",
              validate: Yup.string().trim(),
            },
            email: {
              type: "email",
              label: "Email Address",
              initialValue: email || "",
              validate: Yup.string().email("Invalid email").trim(),
            },
            batch: {
              type: "number",
              label: "Batch",
              initialValue: batch || null,
              validate: Yup.number(),
            },
            section: {
              type: "select",
              label: "Section",
              placeholder: "Select",
              options: ["AM", "BM", "CM", "DM", "EM", "FM", "AF", "BF", "CF"],
              validate: Yup.string().trim(),
              initialValue: section || "",
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
              initialValue: department || "",
            },
            mobile: {
              type: "text",
              label: "Mobile No.",
              initialValue: mobile || "",
              validate: Yup.string().trim(),
            },
            cgpa: {
              type: "number",
              label: "CGPA",
              initialValue: cgpa || undefined,
              validate: Yup.number().min(0).max(4),
            },
            role: {
              type: "select",
              label: "Role",
              options: ["ADMIN", "MODERATOR", "USER"],
              initialValue: role || "",
              validate: Yup.string().trim(),
            },
          }}
          mutation={(values: any) => {
            const body = {
              id,
              ...values,
            }

            return udpateUserData(body)
          }}
          onSuccess={({ body }) => {
            client.invalidateQueries("users")

            if (username !== body.username || name !== body.name)
              client.invalidateQueries("user")

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
