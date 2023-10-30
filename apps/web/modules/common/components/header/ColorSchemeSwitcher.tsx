"use client";

import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { setCookie } from "cookies-next";

import { ActionIcon, Menu, useMantineColorScheme } from "@mantine/core";

export function ColorSchemeSwitcher() {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Menu width={120}>
      <Menu.Target>
        <ActionIcon size="lg" style={{ border: 0 }}>
          {colorScheme === "dark" && (
            <IconMoonStars color="#fcc419" size={16} />
          )}
          {colorScheme === "light" && <IconSun size={16} />}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconSun size={16} />}
          onClick={() => {
            setCookie("color-scheme", "light");
            window.location.reload();
          }}
        >
          Light
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoonStars size={16} />}
          onClick={() => {
            setCookie("color-scheme", "dark");
            window.location.reload();
          }}
        >
          Dark
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
