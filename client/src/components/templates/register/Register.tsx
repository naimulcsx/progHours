import {
  Anchor,
  Box,
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core"
import * as Yup from "yup"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { AppLogo } from "~/components/atoms"
import { useForm, yupResolver } from "@mantine/form"

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string()
    .trim()
    .required("University ID is required")
    .matches(/^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$/, "Invalid University ID"),
  password: Yup.string().trim().required("Password is required"),
})

export interface RegisterTemplateProps {
  onSubmit: (values: { username: string; email: string; name: string; password: string }) => void
  isLoading: boolean
}

export default function RegisterTemplate({ onSubmit, isLoading }: RegisterTemplateProps) {
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
    onSubmit(values)
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
        <Paper shadow="xs" p="xl" sx={{ maxWidth: "440px", flexGrow: 1 }}>
          <Stack spacing={10} mb={20}>
            <Link to="/leaderboard" style={{ textDecoration: "none" }}>
              <AppLogo />
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
              <TextInput label="Name" {...form.getInputProps("name")} withAsterisk />
              <TextInput label="Email" {...form.getInputProps("email")} withAsterisk />
              <TextInput label="University ID" {...form.getInputProps("username")} withAsterisk />
              <PasswordInput label="Password" {...form.getInputProps("password")} withAsterisk />
              <Button type="submit" loading={isLoading}>
                Register
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  )
}
