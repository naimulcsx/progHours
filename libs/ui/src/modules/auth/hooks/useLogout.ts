import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { createElement } from "react";

import { notifications } from "@mantine/notifications";

import { storage } from "@proghours/data-access";

export function useLogout() {
  const router = useRouter();

  const handleLogout = () => {
    // empty storage
    storage.clearToken();

    // show notification
    notifications.show({
      icon: createElement(IconCheck),
      color: "green",
      title: "Success",
      message: "You are logged out!"
    });

    // redirect to homepage
    router.push("/");
  };

  return { handleLogout };
}
