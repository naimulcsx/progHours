import { IconAt, IconLock } from "@tabler/icons-react";

import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import { SignInSchema } from "../schemas";

export interface SignInFormProps {
  form: UseFormReturnType<SignInSchema>;
}

export function SignInForm({
  form,
  ...props
}: SignInFormProps & JSX.IntrinsicElements["form"]) {
  return (
    <form {...props}>
      <Stack>
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
          By signing in, you agree to our Terms and Conditions
        </Text>
        <Button size="md" type="submit">
          Sign In
        </Button>
      </Stack>
    </form>
  );
}
