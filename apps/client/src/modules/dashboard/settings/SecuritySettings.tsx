import { IconCheck } from "@tabler/icons-react";
import { z } from "zod";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  PasswordInput,
  Stack
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { useActiveUser, usePasswordMutation } from "@proghours/data-access";

const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8)
});

export function SecuritySettings() {
  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: ""
    },
    validate: zodResolver(passwordUpdateSchema)
  });
  const { data: user } = useActiveUser();
  const { mutate } = usePasswordMutation({
    config: {
      onSuccess() {
        notifications.show({
          title: "🎉 Congratulations!",
          message: "Your password has been successfully updated.",
          icon: <IconCheck />,
          color: "green"
        });
      }
    }
  });
  const handleSubmit = form.onSubmit((values) => {
    if (user?.username) {
      mutate({
        ...values,
        username: user.username
      });
    }
  });
  return (
    <Box>
      <Stack>
        <Checkbox label="Allow others to view my email address" />
        <Checkbox label="Allow others to view my phone number" />
        <Divider label="Password" />
        <form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Col span={6}>
              <PasswordInput
                withAsterisk
                label="Current Password"
                {...form.getInputProps("currentPassword")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PasswordInput
                withAsterisk
                label="New Password"
                {...form.getInputProps("newPassword")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Button mt="sm" w="100%" type="submit">
                Save
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Stack>
    </Box>
  );
}
