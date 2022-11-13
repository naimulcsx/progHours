import * as Yup from "yup"
import { useToast } from "@chakra-ui/react"
import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"

/**
 * Import Components / Utilities
 */
import { registerMutation } from "~/api/auth"
import { DEFAULT_TOAST_OPTIONS } from "~/configs/toast-config"
import {
  Anchor,
  Box,
  Button,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core"
import Logo from "~/components/Logo"
import { useForm, yupResolver } from "@mantine/form"
import { useMutation } from "react-query"
import { IconCheck, IconX } from "@tabler/icons"
import showToast from "~/utils/showToast"

// schema validation
const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string()
    .trim()
    .required("University ID is required")
    .matches(/^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$/, "Invalid University ID"),
  password: Yup.string().trim().required("Password is required"),
})

/**
 * Component for registration page
 */
const Register = (): JSX.Element => {
  const navigate = useNavigate()

  const mutation = useMutation(registerMutation, {
    onSuccess: ({ message, body }) => {
      const user = body.user
      showToast("success", `Welcome, ${user.name}`)
      navigate("/dashboard")
    },
    onError: ({ response }) => {
      const { error, message } = response.data
      showToast("error", message)
    },
  })

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    validate: yupResolver(registerSchema),
  })

  const handleSubmit = form.onSubmit(async (values) => {
    mutation.mutateAsync(values)
  })

  return (
    <>
      {/* page title */}
      <Helmet>
        <title>Create a new account</title>
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
        <Paper shadow="xs" p="32px" sx={{ maxWidth: "440px", flexGrow: 1, position: "relative" }}>
          <LoadingOverlay visible={mutation.isLoading} overlayBlur={2} />
          <Stack spacing={10} mb={20}>
            <Link to="/leaderboard" style={{ textDecoration: "none" }}>
              <Logo />
            </Link>
            <Title order={3}>Create a new account</Title>
            <Group spacing={6}>
              Already have an account? Please
              <Anchor component={Link} to="/login">
                Login
              </Anchor>
            </Group>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput label="Name" {...form.getInputProps("name")} />
              <TextInput label="Email" {...form.getInputProps("email")} />
              <TextInput label="University ID" {...form.getInputProps("username")} />
              <PasswordInput label="Password" {...form.getInputProps("password")} />
              <Button type="submit">Register</Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  )
}

export default Register
