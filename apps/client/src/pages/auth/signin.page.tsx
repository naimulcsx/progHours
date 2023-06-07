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
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { AppLogo } from "~/assets/AppLogo";
import { Footer } from "~/components/common/Footer";

const signInSchema = z.object({
  username: z
    .string()
    .trim()
    .regex(/^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$/, "Invalid University ID"),
  password: z.string().trim().min(8, "Password is required")
});

type SignInSchema = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const theme = useMantineTheme();
  const form = useForm<SignInSchema>({
    initialValues: {
      username: "",
      password: ""
    },
    validate: zodResolver(signInSchema)
  });
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 56px)"
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
                Sign in to your account
              </Title>
              <Text>
                Don&apos;t have an account?{" "}
                <Anchor component={Link} to="/auth/signup">
                  Sign Up
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
                  By signing in, you agree to our Terms and Conditions
                </Text>
                <Button size="md" type="submit">
                  Sign In
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Box>
      <Footer />
    </>
  );
}
