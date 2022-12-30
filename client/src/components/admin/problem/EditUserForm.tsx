import * as Yup from "yup"
import { useMutation, useQueryClient } from "react-query"
import { udpateUserData } from "~/api/user"
import { useForm, yupResolver } from "@mantine/form"
import showToast from "~/utils/showToast"
import { Button, NumberInput, Select, Stack, TextInput } from "@mantine/core"

// schema validation
const userSchema = Yup.object().shape({
  username: Yup.string().trim(),
  name: Yup.string().trim(),
  email: Yup.string().email("Invalid email").trim(),
  section: Yup.string().trim(),
  department: Yup.string().trim(),
  mobile: Yup.string().trim(),
  batch: Yup.number()
    .positive("Invalid Batch")
    .nullable(true)
    .transform((_, val) => (val === Number(val) ? val : null)),
  cgpa: Yup.number()
    .nullable(true)
    .transform((_, val) => (val === Number(val) ? val : null)),
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
      batch: user?.batch || "",
      section: user?.section || "",
      department: user?.department || "",
      mobile: user?.mobile || "",
      cgpa: user?.cgpa || "",
      role: user?.role || "",
    },

    validate: yupResolver(userSchema),
  })

  const handleSubmit = form.onSubmit(async (values: any) => {
    const data = {
      ...values,
      cgpa: Number(values.cgpa),
    }
    mutation.mutateAsync(data)
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label="University ID" {...form.getInputProps("username")} withAsterisk />
        <TextInput label="Name" {...form.getInputProps("name")} withAsterisk />
        <TextInput label="Email" {...form.getInputProps("email")} withAsterisk />
        <TextInput type="number" label="Batch" {...form.getInputProps("batch")} withAsterisk />
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
          withAsterisk
        />

        <Button type="submit">Save</Button>
      </Stack>
    </form>
  )
}
