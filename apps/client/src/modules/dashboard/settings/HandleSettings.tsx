import { HandleType } from "@prisma/client";
import { IconCheck } from "@tabler/icons-react";
import { useEffect } from "react";
import { z } from "zod";

import { Box, Button, Grid, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { useHandlesMutation, useUserHandles } from "@proghours/data-access";

import { useUser } from "~/modules/auth/hooks/useUser";

const handlesSchema = z.object({
  CODEFORCES: z.string(),
  CODECHEF: z.string()
});

export function HandlesSettings() {
  const { user } = useUser();
  const { data: userHandles, isSuccess } = useUserHandles({
    username: user?.username,
    config: { enabled: !!user }
  });
  const { mutate } = useHandlesMutation({
    config: {
      onSuccess(res) {
        notifications.show({
          variant: "proghours-ui",
          title: "🎉 Congratulations!",
          message: "Your handles have been successfully updated.",
          icon: <IconCheck />,
          color: "green"
        });
      }
    }
  });
  const form = useForm({
    initialValues: {
      CODEFORCES: "",
      CODECHEF: "",
      SPOJ: "",
      ATCODER: "",
      GITHUB: ""
    },
    validate: zodResolver(handlesSchema)
  });
  // Using effect because onSuccess is going to be deprecated
  useEffect(() => {
    if (userHandles) {
      userHandles.map((userHandle) =>
        form.setFieldValue(userHandle.type, userHandle.handle)
      );
    }
    // eslint-disable-next-line
  }, [userHandles]);
  return (
    <Box>
      <Text mb="lg">
        When you update your handles, all of your previous submissions will be
        temporarily unverified. All of your submissions will be subject to
        re-verification against your new handle.
      </Text>
      {isSuccess && (
        <form
          onSubmit={form.onSubmit((values) => {
            if (user?.username) {
              mutate({
                username: user.username,
                handles: Object.keys(values).map((key) => {
                  const type = key as HandleType;
                  return {
                    type,
                    handle: values[key as keyof typeof form.values]
                  };
                })
              });
            }
          })}
        >
          <Grid mt="sm">
            <Grid.Col span={4}>
              <TextInput
                label="Codeforces"
                placeholder="Codeforces handle"
                {...form.getInputProps("CODEFORCES")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="Codechef"
                placeholder="CodeChef handle"
                {...form.getInputProps("CODECHEF")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Button mt="sm" type="submit" fullWidth>
                Save
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      )}
    </Box>
  );
}
