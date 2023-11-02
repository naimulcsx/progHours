import { useNavigate, useSubmit } from "@remix-run/react";
import { IconCheck } from "@tabler/icons-react";
import Cookies from "js-cookie";

import { RefObject, createElement } from "react";

import { notifications } from "@mantine/notifications";

export function useLogoutRemix(dummyFormRef: RefObject<HTMLFormElement>) {
  const submit = useSubmit();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessToken");

    notifications.show({
      icon: createElement(IconCheck),
      color: "green",
      title: "Success",
      message: "You are logged out!"
    });

    submit(dummyFormRef.current);

    navigate("/auth/sign-in");
  };

  return { handleLogout };
}
