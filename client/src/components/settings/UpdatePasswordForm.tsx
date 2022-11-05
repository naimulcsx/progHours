import * as Yup from "yup"
import useUser from "~/hooks/useUser"
import { useForm, yupResolver } from "@mantine/form"
import { Box, Button, PasswordInput, Stack } from "@mantine/core"
import { useMutation, useQueryClient } from "react-query"
import axios from "axios"
import { showNotification } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons"

const updatePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().trim().required("Name is required"),
  newPassword: Yup.string().trim().required("Password is required"),
})

// mutation={(values: any) =>
//   axios.patch(`/api/users/me?update=password`, values)
// }
// onSuccess={() => {
//   toast({ status: "success", title: "Account updated!" })
// }}
// onError={(e) => {
//   toast({ status: "error", title: e.response.data.message })
// }}

export const UpdatePasswordForm = () => {
  const { user } = useUser()

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(
    (values: any) => {
      return axios.patch(`/api/users/me?update=password`, values)
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
      currentPassword: "",
      newPassword: "",
    },

    validate: yupResolver(updatePasswordSchema),
  })

  const handleSubmit = form.onSubmit(async (values) => {
    mutateAsync(values)
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
            <PasswordInput
              label="Current Password"
              {...form.getInputProps("currentPassword")}
            />
            <PasswordInput
              label="New Password"
              {...form.getInputProps("newPassword")}
            />
            <Box>
              <Button type="submit">Update</Button>
            </Box>
          </Stack>
        </form>
      )}
    </Box>
  )
}
