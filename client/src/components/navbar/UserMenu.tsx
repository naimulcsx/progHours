import { Box, Button, Menu, Text } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { IconChevronDown, IconLogout, IconSettings, IconUser } from "@tabler/icons"
import { getAvatarColors } from "~/utils/getAvatarColors"
import { User } from "~/contexts/UserContext"
import { FC } from "react"
import useLogout from "~/hooks/useLogout"
import Avatar from "~/components/Avatar"

const UserMenu: FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate()
  const handleLogout = useLogout()
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button size="sm" variant="subtle" leftIcon={<Avatar name={user.name} width={28} height={28} />} px="sm">
          <Text
            mr="xs"
            sx={(theme) => ({
              color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                display: "none",
              },
            })}
          >
            {user.name}
          </Text>
          <IconChevronDown size={16} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconUser size={14} />} onClick={() => navigate(`/${user.username}`)}>
          Profile
        </Menu.Item>
        <Menu.Item icon={<IconSettings size={14} />} onClick={() => navigate("/settings")}>
          Settings
        </Menu.Item>
        <Menu.Item icon={<IconLogout size={14} />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserMenu
