import { IconCheck } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

import { Button, Stack, TagsInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { useActiveUser, useUserMutation } from "@proghours/data-access";

export function AboutSkillsSettings() {
  const client = useQueryClient();

  const form = useForm({
    initialValues: {
      about: "",
      skills: []
    }
  });

  const { data: user } = useActiveUser({
    config: {
      onSuccess: (data) => {
        if (data.metaData.about) {
          form.setFieldValue("about", data.metaData.about);
        }
        if (data.metaData.skills) {
          form.setFieldValue("skills", data.metaData.skills as never);
        }
      }
    }
  });

  const { mutate, isLoading } = useUserMutation({
    config: {
      onSuccess() {
        notifications.show({
          variant: "proghours-ui",
          title: "🎉 Congratulations!",
          message: "Your profile has been successfully updated.",
          icon: <IconCheck />,
          color: "green"
        });
        client.invalidateQueries(["profile", user?.username]);
        modals.closeAll();
      }
    }
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        mutate({
          username: "c181065",
          metaData: {
            ...user?.metaData,
            ...values
          }
        });
      })}
    >
      <Stack>
        <Textarea
          withAsterisk
          label="About"
          rows={6}
          {...form.getInputProps("about")}
        />
        <TagsInput
          withAsterisk
          label="Skills"
          placeholder="Pick tag from list"
          data={[
            "TypeScript",
            "React",
            "Angular",
            "Svelte",
            "Algorithms",
            "Data Structures",
            "CSS"
          ]}
          value={form.values.skills}
          onChange={(values) => {
            form.setFieldValue("skills", values as never);
          }}
        />
        <Button disabled={isLoading} type="submit" variant="msu-secondary">
          Update
        </Button>
      </Stack>
    </form>
  );
}
