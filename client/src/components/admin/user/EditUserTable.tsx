import FormBuilder from "@/components/FormBuilder"
import PopupBuilder from "@/components/PopupBuilder"
import * as Yup from "yup"
import { useQueryClient } from "react-query"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { useToast } from "@chakra-ui/react"
import { udpateUserData } from "@/api/user"
import { User } from "@/GlobalStateProvider"

export default function EditUserTable({ data, isOpen, setIsOpen }: any) {
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
  } = data

  return (
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
            initialValue: username ? username : "",
            validate: Yup.string().trim(),
          },
          name: {
            type: "text",
            label: "Name",
            initialValue: name ? name : "",
            validate: Yup.string().trim(),
          },
          email: {
            type: "email",
            label: "Email Address",
            initialValue: email ? email : "",
            validate: Yup.string().email("Invalid email").trim(),
          },
          batch: {
            type: "number",
            label: "Batch",
            initialValue: batch ? batch : "",
            validate: Yup.number().positive("Invalid Batch"),
            optional: true,
          },
          section: {
            type: "select",
            label: "Section",
            placeholder: "Select",
            options: ["AM", "BM", "CM", "DM", "EM", "FM", "AF", "BF", "CF"],
            validate: Yup.string().trim(),
            initialValue: section ? section : "",
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
            initialValue: department ? department : "",
            optional: true,
          },
          mobile: {
            type: "text",
            label: "Mobile No.",
            initialValue: mobile ? mobile : "",
            validate: Yup.string().trim(),
            optional: true,
          },
          cgpa: {
            type: "number",
            label: "CGPA",
            initialValue: cgpa ? cgpa : "",
            validate: Yup.number().min(0).max(4),
            optional: true,
          },
          role: {
            type: "select",
            label: "Role",
            options: ["ADMIN", "MODERATOR", "USER"],
            initialValue: role ? role : "",
            validate: Yup.string().trim(),
          },
        }}
        mutation={(values: any) => {
          return udpateUserData(Number(id), values)
        }}
        onSuccess={({ body }) => {
          console.log(data)
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
  )
}

interface EditUser {
  body: {
    users: User[]
  }
}
