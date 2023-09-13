import { IconCheck } from "@tabler/icons-react";
import { createElement } from "react";
import { useNavigate } from "react-router-dom";

import { notifications } from "@mantine/notifications";

import { storage } from "@proghours/data-access";

export function useLogout() {
  const navigate = useNavigate();

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
    navigate("/");
  };

  return { handleLogout };
}
