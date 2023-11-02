import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { IconCheck } from "@tabler/icons-react";

import { Anchor, Box, Center, Stack, Text, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { client } from "@proghours/data-access";
import { SignUpForm, SignUpSchema, signUpSchema } from "@proghours/ui";

export const meta: MetaFunction = () => ({
  title: "Sign Up - progHours"
});

export default function SignUpPage() {
  const { mutate } = client.auth.signUp.useMutation({
    config: {
      onSuccess: () => {
        notifications.show({
          icon: <IconCheck />,
          color: "green",
          title: "Success",
          message: "You account is successfully created!"
        });
      }
    }
  });

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
    <Center mt="xl" px="md">
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
          <SignUpForm
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
