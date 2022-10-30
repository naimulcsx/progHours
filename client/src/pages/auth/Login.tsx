import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import * as Yup from "yup"

import {
  Title,
  PasswordInput,
  TextInput,
  Button,
  Stack,
  Box,
  Group,
  Paper,
  Anchor,
  LoadingOverlay,
} from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"

// Import Components / Utilities
import { loginMutation } from "@/api/auth"
import { useMutation } from "react-query"
import { showNotification } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons"
import Logo from "@/components/Logo"
import { FC } from "react"

// schema validation
const loginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("University ID is required")
    .matches(/^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$/, "Invalid University ID"),
  password: Yup.string().trim().required("Password is required"),
})

// login page
const Login: FC = () => {
  const navigate = useNavigate()

  const mutation = useMutation(loginMutation, {
    onSuccess: ({ message, body }) => {
      const user = body.user
      showNotification({
        title: message,
        message: `Welcome, ${user.name}`,
        color: "green",
        icon: <IconCheck />,
      })
      navigate("/dashboard")
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
  })

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: yupResolver(loginSchema),
  })

  const handleSubmit = form.onSubmit(async (values) => {
    mutation.mutateAsync(values)
  })

  return (
    <>
      {/* page title */}
      <Helmet>
        <title>Login</title>
      </Helmet>

      {/* page content */}
      <Box
        px="md"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          shadow="xs"
          p="32px"
          sx={{ maxWidth: "440px", flexGrow: 1, position: "relative" }}
        >
          <LoadingOverlay visible={mutation.isLoading} overlayBlur={2} />
          <Stack spacing={10} mb={20}>
            <Logo />
            <Title order={3}>Login to Account</Title>
            <Group spacing={6}>
              Don't have an account?
              <Anchor component={Link} to="/register">
                Register
              </Anchor>
            </Group>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput
                label="University ID"
                {...form.getInputProps("username")}
              />
              <PasswordInput
                label="Password"
                {...form.getInputProps("password")}
              />
              <Button type="submit">Login</Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  )
}

export default Login
