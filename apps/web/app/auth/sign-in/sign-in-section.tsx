"use client";

import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { client } from "@proghours/data-access";
import { SignInForm, SignInSchema, signInSchema } from "@proghours/ui";

export function SignInSection() {
  const router = useRouter();

  const { mutate } = client.auth.signIn.useMutation({
    config: {
      onSuccess: () => {
        notifications.show({
          icon: <IconCheck />,
          color: "green",
          title: "Success",
          message: "Successfully logged in!"
        });
        router.refresh();
        router.push("/");
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
    <SignInForm
      form={form}
      onSubmit={form.onSubmit((values) => {
        mutate(values);
      })}
    />
  );
}
