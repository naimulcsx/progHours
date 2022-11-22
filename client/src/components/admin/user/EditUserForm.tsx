import FormBuilder from "~/components/FormBuilder"
import PopupBuilder from "~/components/PopupBuilder"
import * as Yup from "yup"
import { useMutation, useQueryClient } from "react-query"
import { DEFAULT_TOAST_OPTIONS } from "~/configs/toast-config"
import { useToast } from "@chakra-ui/react"
import { udpateUserData } from "~/api/user"
import { User } from "~/contexts/UserContext"
import { useForm, yupResolver } from "@mantine/form"
import showToast from "~/utils/showToast"
import { Button, NumberInput, Select, Stack, TextInput } from "@mantine/core"

// schema validation
const userSchema = Yup.object().shape({
  username: Yup.string().trim(),
  name: Yup.string().trim(),
  email: Yup.string().email("Invalid email").trim(),
  batch: Yup.number().positive("Invalid Batch"),
  section: Yup.string().trim(),
  department: Yup.string().trim(),
  mobile: Yup.string().trim(),
  cgpa: Yup.number().min(0.0).max(4.0),
  role: Yup.string().trim(),
})

export default function EditUserForm({ data: user, setIsOpen }: any) {
  const client = useQueryClient()

  const mutation = useMutation((data) => udpateUserData(Number(user?.id), data), {
    onSuccess: ({ body }) => {
      client.invalidateQueries("users")
      if (user?.username !== body.username || user?.name !== body.name) client.invalidateQueries("user")

      showToast("success", "User updated")
      setIsOpen(false)
    },
    onError: (err: any) => {
      showToast("error", err.response.data.message)

      setIsOpen(false)
    },
  })

  const form = useForm({
    initialValues: {
      username: user?.username || "",
      name: user?.name || "",
      email: user?.email || "",
      batch: user?.batch || 1,
      section: user?.section || "",
      department: user?.department || "",
      mobile: user?.mobile || "",
      cgpa: user?.cgpa || 0.0,
      role: user?.role || "",
    },

    validate: yupResolver(userSchema),
  })

  const handleSubmit = form.onSubmit(async (values: any) => {
    mutation.mutateAsync(values)
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label="University ID" {...form.getInputProps("username")} />
        <TextInput label="Name" {...form.getInputProps("name")} />
        <TextInput label="Email" {...form.getInputProps("email")} />
        <NumberInput label="Batch" {...form.getInputProps("batch")} />

        <Select
          label="Sections"
          placeholder="Select"
          {...form.getInputProps("section")}
          data={[
            { label: "AM", value: "AM" },
            { label: "BM", value: "BM" },
            { label: "CM", value: "CM" },
            { label: "DM", value: "DM" },
            { label: "EM", value: "EM" },
            { label: "FM", value: "FM" },
            { label: "AF", value: "AF" },
            { label: "BF", value: "BF" },
            { label: "CF", value: "CF" },
          ]}
        />
        <Select
          label="Department"
          placeholder="Select"
          {...form.getInputProps("department")}
          data={[
            { label: "Computer Science and Engineering (CSE)", value: "CSE" },
            { label: "Computer and Communication Engineering (CCE)", value: "CCE" },
            { label: "Electrical and Electronic Engineering (EEE)", value: "EEE" },
          ]}
        />
        <TextInput label="Mobile No" {...form.getInputProps("mobile")} />
        <TextInput type="number" label="CGPA" {...form.getInputProps("cgpa")} />

        <Select
          label="Role"
          {...form.getInputProps("role")}
          data={[
            { label: "ADMIN", value: "ADMIN" },
            { label: "MODERATOR", value: "MODERATOR" },
            { label: "USER", value: "USER" },
          ]}
        />

        <Button type="submit">Save</Button>
      </Stack>
    </form>
  )
}
