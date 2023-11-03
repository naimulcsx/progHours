import { IconAt, IconCheck, IconLock } from "@tabler/icons-react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import {
  Anchor,
  Box,
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { storage, useLoginMutation } from "@proghours/data-access";

const signInSchema = z.object({
  username: z.string().trim().min(6),
  password: z.string().trim().min(8, "Password is required")
});

type SignInSchema = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { mutate } = useLoginMutation({
    config: {
      onSuccess: (res) => {
        storage.setToken({ accessToken: res.accessToken });
        notifications.show({
          icon: <IconCheck />,
          color: "green",
          title: "Success",
          message: "Successfully logged in!"
        });
        navigate("/");
      }
    }
  });
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
        <title>Sign In | progHours</title>
      </Helmet>
      <Box
        mt="xl"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: theme.spacing.sm,
          paddingRight: theme.spacing.sm
        }}
      >
        <Box style={{ maxWidth: "440px", flexGrow: 1 }}>
          <Stack>
            <Box>
              <Title order={2} mb="4px">
                Sign in to your account
              </Title>
              <Text>
                Don&apos;t have an account?{" "}
                <Anchor
                  underline="always"
                  style={{
                    color: "hsl(var(--primary))",
                    textUnderlineOffset: 2
                  }}
                  component={Link}
                  to="/auth/sign-up"
                >
                  Sign Up
                </Anchor>
              </Text>
            </Box>
            <form
              onSubmit={form.onSubmit((values) => {
                mutate(values);
              })}
            >
              <Stack>
                <TextInput
                  label="Username"
                  placeholder="Enter your Username"
                  leftSection={<IconAt size={16} />}
                  withAsterisk
                  {...form.getInputProps("username")}
                />
                <PasswordInput
                  label="Password"
                  leftSection={<IconLock size={16} />}
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
        </Box>
      </Box>
    </>
  );
}
