"use client";

import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { client } from "@proghours/data-access";
import { SignUpForm, SignUpSchema, signUpSchema } from "@proghours/ui";

export function SignUpSection() {
  const router = useRouter();

  const { mutate } = client.auth.signUp.useMutation({
    config: {
      onSuccess: () => {
        notifications.show({
          icon: <IconCheck />,
          color: "green",
          title: "Success",
          message: "You account is successfully created!"
        });
        router.push("/auth/sign-in");
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
    <SignUpForm
      form={form}
      onSubmit={form.onSubmit((values) => {
        mutate(values);
      })}
    />
  );
}
