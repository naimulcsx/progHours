import { IconAt, IconLock, IconMail, IconUser } from "@tabler/icons-react";

import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import { SignUpSchema } from "../schemas";

export interface SignUpFormProps {
  form: UseFormReturnType<SignUpSchema>;
}

export function SignUpForm({
  form,
  ...props
}: SignUpFormProps & JSX.IntrinsicElements["form"]) {
  return (
    <form {...props}>
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
  );
}
