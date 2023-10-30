import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { createElement } from "react";

import { notifications } from "@mantine/notifications";

import { client } from "@proghours/data-access";

export function useLogout() {
  const router = useRouter();

  const { mutate } = client.auth.signOut.useMutation({
    config: {
      onSuccess() {
        notifications.show({
          icon: createElement(IconCheck),
          color: "green",
          title: "Success",
          message: "You are logged out!"
        });

        router.refresh();
        router.push("/auth/sign-in");
      }
    }
  });

  const handleLogout = () => {
    mutate();
  };

  return { handleLogout };
}
