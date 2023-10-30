"use client";

import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";

import { Button, Menu } from "@mantine/core";

import { IconHome, IconLogout, IconSettings } from "@proghours/ui";

import { useLogout } from "~/modules/auth/hooks/useLogout";

export function ActiveUserMenu({ fullName }: { fullName: string }) {
  const { handleLogout } = useLogout();

  return (
    <Menu width={200}>
      <Menu.Target>
        <Button
          fw={600}
          variant="proghours-ui-secondary"
          rightSection={<IconChevronDown size={16} />}
        >
          {fullName}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconHome width={18} height={18} />}
          component={Link}
          href="/overview"
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSettings width={18} height={18} />}
          component={Link}
          href="/settings/appearance"
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout width={18} height={18} />}
          onClick={handleLogout}
        >
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
