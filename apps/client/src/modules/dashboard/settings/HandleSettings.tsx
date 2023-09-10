import { HandleType } from "@prisma/client";
import { IconCheck } from "@tabler/icons-react";
import { z } from "zod";

import { Box, Button, Grid, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { useUser } from "~/modules/auth/hooks/useUser";

import { useHandlesMutation } from "@proghours/data-access";

const handlesSchema = z.object({
  codeforces: z.string(),
  codechef: z.string()
});

export function HandlesSettings() {
  const { user } = useUser();
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
      codeforces: "",
      codechef: ""
    },
    validate: zodResolver(handlesSchema)
  });
  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) => {
          if (user?.username) {
            mutate({
              username: user.username,
              handles: Object.keys(values).map((key) => {
                const type = key.toUpperCase() as HandleType;
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
              {...form.getInputProps("codeforces")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Codechef"
              placeholder="CodeChef handle"
              {...form.getInputProps("codechef")}
            />
          </Grid.Col>
          {/* <Grid.Col span={4}>
            <TextInput label="SPOJ" placeholder="SPOJ handle" />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput label="AtCoder" placeholder="AtCoder handle" />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput label="CSES" placeholder="CSES handle" />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput label="Toph" placeholder="Toph handle" />
          </Grid.Col> */}
          <Grid.Col span={12}></Grid.Col>
        </Grid>
        <Button mt="sm" type="submit" fullWidth>
          Save
        </Button>
      </form>
    </Box>
  );
}
