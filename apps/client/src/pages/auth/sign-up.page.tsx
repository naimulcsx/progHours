import { IconAt, IconLock, IconMail, IconUser } from "@tabler/icons-react";
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

import { Layout } from "~/modules/common/components/Layout";

import { useSignUpMutation } from "@proghours/data-access";

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
  const navigate = useNavigate();
  const form = useForm<SignUpSchema>({
    initialValues: {
      fullName: "",
      email: "",
      username: "",
      password: ""
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
    <Layout>
      <Helmet>
        <title>Sign Up | progHours</title>
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
                  label="University ID"
                  placeholder="Enter your University ID"
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
                  By signing up, you agree to our Terms and Conditions
                </Text>
                <Button size="md" type="submit">
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
}
