import * as Yup from "yup"
import useUser from "~/hooks/useUser"
import { useForm, yupResolver } from "@mantine/form"
import { Box, Button, Paper, PasswordInput, Stack, Title } from "@mantine/core"
import { useMutation, useQueryClient } from "react-query"
import axios from "axios"
import showToast from "~/utils/showToast"

const updatePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().trim().required("Current password is required"),
  newPassword: Yup.string().trim().required("New password is required"),
})

export default function SettingsPasswordForm() {
  const { user } = useUser()
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(
    (values: any) => {
      return axios.patch(`/api/users/me?update=password`, values)
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
      currentPassword: "",
      newPassword: "",
    },

    validate: yupResolver(updatePasswordSchema),
  })

  const handleSubmit = form.onSubmit(async (values) => {
    mutateAsync(values)
  })

  return (
    <Paper mb={10} p={25}>
      <Title order={4} mb="md">
        Change Password
      </Title>
      {user && (
        <form onSubmit={handleSubmit}>
          <Stack>
            <PasswordInput
              label="Current Password"
              {...form.getInputProps("currentPassword")}
              withAsterisk
            />
            <PasswordInput
              label="New Password"
              {...form.getInputProps("newPassword")}
              withAsterisk
            />
            <Box>
              <Button type="submit">Update</Button>
            </Box>
          </Stack>
        </form>
      )}
    </Paper>
  )
}
