import {
  IconAt,
  IconHash,
  IconLock,
  IconMail,
  IconUser
} from "@tabler/icons-react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import {
  Anchor,
  Box,
  Button,
  Center,
  Notification,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { useSignUpMutation } from "@proghours/data-access";

const signUpSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email"),
  username: z.string().trim().min(6),
  password: z.string().trim().min(8, "Password is required"),
  invitationCode: z.string().trim().min(1)
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const navigate = useNavigate();
  const form = useForm<SignUpSchema>({
    initialValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
      invitationCode: ""
    },
    validate: zodResolver(signUpSchema)
  });
  const { mutate } = useSignUpMutation({
    config: {
      onSuccess: () => {
        notifications.show({
          title: "Success",
          message: "You account is successfully created!"
        });
        navigate("/auth/sign-in");
      }
    }
  });
  return (
    <>
      <Helmet>
        <title>Sign Up | progHours</title>
      </Helmet>
      <Center mt="md">
        <Box style={{ maxWidth: "440px", flexGrow: 1 }}>
          <Stack>
            <Notification title="🔐 We're currently in private beta">
              You'll need an invitation code to join. However, we plan to make
              the platform open to everyone very soon.
            </Notification>
            <Box>
              <Title order={3} mb="4px">
                Sign up for an account
              </Title>
              <Text>
                Already have an account?{" "}
                <Anchor
                  underline="always"
                  style={{
                    color: "hsl(var(--primary))",
                    textUnderlineOffset: 2
                  }}
                  component={Link}
                  to="/auth/sign-in"
                >
                  Sign In
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
                  label="Name"
                  leftSection={<IconUser size={16} />}
                  placeholder="Enter your Full Name"
                  withAsterisk
                  {...form.getInputProps("fullName")}
                />
                <TextInput
                  label="Email"
                  leftSection={<IconMail size={16} />}
                  placeholder="Enter your Email address"
                  withAsterisk
                  {...form.getInputProps("email")}
                />
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
                <TextInput
                  label="Invitation Code"
                  leftSection={<IconHash size={16} />}
                  placeholder="Your invitation code"
                  withAsterisk
                  {...form.getInputProps("invitationCode")}
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
        </Box>
      </Center>
    </>
  );
}
