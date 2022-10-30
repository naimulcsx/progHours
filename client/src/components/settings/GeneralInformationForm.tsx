import * as Yup from "yup"
import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { showNotification } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons"
import { useForm, yupResolver } from "@mantine/form"
import {
  Box,
  Button,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core"
import useUser from "@/hooks/useUser"

const infoSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string()
    .trim()
    .required("University ID is required")
    .matches(/^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$/, "Invalid University ID"),
  mobile: Yup.string().trim(),
  department: Yup.string().trim(),
  batch: Yup.number().positive("Invalid Batch"),
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
        queryClient.invalidateQueries("user"),
          showNotification({
            title: "Account updated!",
            message: `Account updated!`,
            color: "green",
            icon: <IconCheck />,
          })
      },
      onError: ({ response }) => {
        const { error, message } = response.data
        showNotification({
          title: message,
          message: error,
          color: "red",
          icon: <IconX />,
        })
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
      batch: user?.batch || 1,
      section: user?.section || "",
      cgpa: user?.cgpa || 0.0,
    },
    validate: yupResolver(infoSchema),
  })

  const handleSubmit = form.onSubmit(async (values) => {
    console.log(values)
    mutation.mutateAsync(values)
  })

  return (
    <Box
      mx={-4}
      mb={10}
      p={25}
      sx={{
        backgroundColor: "white",
        boxShadow:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      }}
    >
      {user && (
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput label="Name" {...form.getInputProps("name")} />
            <TextInput label="Email" {...form.getInputProps("email")} />
            <TextInput label="Mobile" {...form.getInputProps("mobile")} />
            <TextInput
              label="University ID"
              {...form.getInputProps("username")}
            />
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
            <NumberInput label="CGPA" {...form.getInputProps("cgpa")} />
            <Box>
              <Button type="submit">Update</Button>
            </Box>
          </Stack>
        </form>
      )}
    </Box>
  )
}
