import {
  Anchor,
  Box,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme
} from "@mantine/core";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { IconUser, IconMail, IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { AppLogo } from "~/assets/AppLogo";

const signUpSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email"),
  username: z
    .string()
    .trim()
    .regex(/^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$/, "Invalid University ID"),
  password: z.string().trim().min(8, "Password is required")
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const theme = useMantineTheme();
  const form = useForm<SignUpSchema>({
    initialValues: {
      fullName: "",
      email: "",
      username: "",
      password: ""
    },
    validate: zodResolver(signUpSchema)
  });
  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh"
        }}
      >
        <Paper
          p="xl"
          shadow="sm"
          sx={{
            border: `1px solid ${theme.colors.gray[2]}`,
            maxWidth: "480px",
            flexGrow: 1
          }}
        >
          <Stack>
            <Box>
              <AppLogo mb="xs" />
              <Title order={2} mb="4px">
                Sign up for an account
              </Title>
              <Text>
                Already have an account?{" "}
                <Anchor component={Link} to="/auth/signin">
                  Sign In
                </Anchor>
              </Text>
            </Box>
            <form
              onSubmit={form.onSubmit((values) => {
                console.log(values);
              })}
            >
              <Stack>
                <TextInput
                  label="Name"
                  icon={<IconUser size={16} />}
                  placeholder="Enter your Full Name"
                  withAsterisk
                  {...form.getInputProps("fullName")}
                />
                <TextInput
                  label="Email"
                  icon={<IconMail size={16} />}
                  placeholder="Enter your Email address"
                  withAsterisk
                  {...form.getInputProps("email")}
                />
                <TextInput
                  label="University ID"
                  placeholder="Enter your University ID"
                  icon={<IconAt size={16} />}
                  withAsterisk
                  {...form.getInputProps("username")}
                />
                <PasswordInput
                  label="Password"
                  icon={<IconLock size={16} />}
                  placeholder="Enter your password"
                  withAsterisk
                  {...form.getInputProps("password")}
                />
                <Text size="sm">
                  By signing up, you agree to our Terms and Conditions
                </Text>
                <Button size="md" type="submit">
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
