import { MetaFunction } from "@remix-run/node";
import { Form, Link, useNavigate, useSubmit } from "@remix-run/react";
import { IconCheck } from "@tabler/icons-react";
import Cookies from "js-cookie";

import { useRef } from "react";

import { Anchor, Box, Center, Stack, Text, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { client, storage } from "@proghours/data-access";
import { SignInForm, SignInSchema, signInSchema } from "@proghours/ui";

export const action = () => null;

export const meta: MetaFunction = () => ({
  title: "Sign In - progHours"
});

export default function SignInPage() {
  const submit = useSubmit();
  const dummyFormRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  const { mutate } = client.auth.signIn.useMutation({
    config: {
      onSuccess: (res) => {
        notifications.show({
          icon: <IconCheck />,
          color: "green",
          title: "Success",
          message: "Successfully logged in!"
        });
        storage.setToken({ accessToken: res.accessToken });
        Cookies.set("accessToken", res.accessToken);
        if (dummyFormRef.current) submit(dummyFormRef.current);
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
    <Center mt="xl" px="md">
      <Form method="post" ref={dummyFormRef}></Form>

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

          <SignInForm
            form={form}
            onSubmit={form.onSubmit((values) => {
              mutate(values);
            })}
          />
        </Stack>
      </Box>
    </Center>
  );
}
