import * as Yup from "yup"
import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { useForm, yupResolver } from "@mantine/form"
import { Box, Button, NumberInput, Paper, Select, Stack, TextInput, Title } from "@mantine/core"
import useUser from "~/hooks/useUser"
import showToast from "~/utils/showToast"

const infoSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string()
    .trim()
    .required("University ID is required")
    .matches(/^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$/, "Invalid University ID"),
  mobile: Yup.string().trim(),
  department: Yup.string().trim(),
  batch: Yup.number()
    .positive("Invalid Batch")
    .nullable(true)
    .transform((_, val) => (val === Number(val) ? val : null)),
  section: Yup.string().trim(),
  cgpa: Yup.number().min(0.0).max(4.0),
})

export const GeneralInformationForm = () => {
  const { user } = useUser()
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (values: any) => {
      return axios.patch(`/api/users/me?update=data`, values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user")
        showToast("success", "Account updated!")
      },
      onError: ({ response }) => {
        const { error, message } = response.data
        showToast("error", message)
      },
    }
  )

  const form = useForm({
    initialValues: {
      name: user?.name || "",
      username: user?.username.toUpperCase() || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      department: user?.department || "",
      batch: user?.batch || "",
      section: user?.section || "",
      cgpa: user?.cgpa || 0.0,
    },
    validate: yupResolver(infoSchema),
  })

  const handleSubmit = form.onSubmit((values) => {
    mutation.mutateAsync(values)
  })

  return (
    <Paper
      mb={10}
      p={24}
      sx={(theme) => ({
        borderRadius: theme.radius.md,
      })}
    >
      <Title order={4} mb="md">
        Your Profile
      </Title>
      {user && (
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput label="Name" {...form.getInputProps("name")} withAsterisk />
            <TextInput label="University ID" disabled {...form.getInputProps("username")} withAsterisk />
            <TextInput label="Email" {...form.getInputProps("email")} withAsterisk />
            <TextInput label="Mobile" {...form.getInputProps("mobile")} />

            <Select
              label="Department"
              placeholder="Select"
              {...form.getInputProps("department")}
              data={[
                {
                  value: "CSE",
                  label: "Computer Science and Engineering (CSE)",
                },
                {
                  value: "CCE",
                  label: "Computer and Communication Engineering (CCE)",
                },
                {
                  value: "EEE",
                  label: "Electrical and Electronic Engineering (EEE)",
                },
              ]}
            />
            <NumberInput label="Batch" {...form.getInputProps("batch")} />
            <Select
              label="Section"
              {...form.getInputProps("section")}
              placeholder="Select"
              data={[
                { value: "AM", label: "AM" },
                { value: "BM", label: "BM" },
                { value: "CM", label: "CM" },
                { value: "DM", label: "DM" },
                { value: "EM", label: "EM" },
                { value: "FM", label: "FM" },
                { value: "AF", label: "AF" },
                { value: "BF", label: "BF" },
                { value: "CF", label: "CF" },
              ]}
            />
            <TextInput type="number" label="CGPA" {...form.getInputProps("cgpa")} />
            <Box>
              <Button type="submit">Update</Button>
            </Box>
          </Stack>
        </form>
      )}
    </Paper>
  )
}
