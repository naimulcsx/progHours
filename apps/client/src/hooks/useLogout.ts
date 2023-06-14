import { notifications } from "@mantine/notifications";
import { storage } from "@proghours/data-access";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IconCheck } from "@tabler/icons-react";

export function useLogout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    storage.clearToken();
    navigate("/");
    notifications.show({
      icon: React.createElement(IconCheck),
      color: "green",
      title: "Success",
      message: "You are logged out"
    });
  };
  return { handleLogout };
}
