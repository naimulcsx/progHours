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
} from "@mantine/core"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import * as Yup from "yup"
import { useForm, yupResolver } from "@mantine/form"
import { AppLogo } from "~/components/atoms"

// schema validation
const loginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("University ID is required")
    .matches(/^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$/, "Invalid University ID"),
  password: Yup.string().trim().required("Password is required"),
})

export interface LoginTemplateProps {
  onSubmit: (values: { username: string; password: string }) => void
  isLoading: boolean
}

// login page
export default function LoginTemplate({ onSubmit, isLoading }: LoginTemplateProps) {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: yupResolver(loginSchema),
  })
  const handleSubmit = form.onSubmit(async (values) => {
    onSubmit(values)
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
        <Paper shadow="xs" p="xl" sx={{ maxWidth: "440px", flexGrow: 1 }}>
          <Stack spacing={10} mb={20}>
            <Link to="/leaderboard" style={{ textDecoration: "none" }}>
              <AppLogo />
            </Link>
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
              <TextInput withAsterisk label="University ID" {...form.getInputProps("username")} />
              <PasswordInput withAsterisk label="Password" {...form.getInputProps("password")} />
              <Button type="submit" loading={isLoading}>
                Login
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  )
}
