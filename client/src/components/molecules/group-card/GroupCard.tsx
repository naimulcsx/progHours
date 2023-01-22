import { Anchor, Badge, Button, Group, Menu, Paper, Stack, Text, Title } from "@mantine/core"
import { IconDotsVertical, IconTrash } from "@tabler/icons"
import { useState } from "react"
import { Link } from "react-router-dom"
import UserGroups from "~/types/UserGroup"
import GroupDeleteModal from "../group-delete-modal/GroupDeleteModal"

export default function GroupCard({ item }: { item: UserGroups }) {
  const [isOpen, setIsOpen] = useState(false)
  const group = item.group
  return (
    <Paper
      p="lg"
      sx={(theme) => ({
        position: "relative",
        borderRadius: theme.radius.md,
      })}
    >
      <Stack align="flex-start" spacing={"xs"}>
        <Anchor
          component={Link}
          to={`/groups/${group.slug}`}
          sx={{ "&:hover": { textDecoration: "none" } }}
        >
          <Title order={4}>{group.name}</Title>
        </Anchor>

        <Anchor
          component={Link}
          to={`/groups/${group.slug}`}
          sx={{ "&:hover": { textDecoration: "none" } }}
        >
          <Text sx={{ fontWeight: 600 }}>#{group.slug}</Text>
        </Anchor>
        <Badge color="pink">{item.role}</Badge>
        <Group>
          <Text color="blue" size="sm">
            {group.users.filter((item: any) => item.role === "MEMBER").length} members
          </Text>
        </Group>
      </Stack>
      <Menu>
        <Menu.Target>
          <Button
            color="gray"
            variant="subtle"
            size="xs"
            sx={{ position: "absolute", top: 8, right: 8, padding: 4 }}
          >
            <IconDotsVertical size={18} />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item icon={<IconTrash size={14} />} onClick={() => setIsOpen(true)}>
            Delete Group
          </Menu.Item>

          {/* Other items ... */}
        </Menu.Dropdown>
      </Menu>
      {/* delete popup */}
      <GroupDeleteModal open={isOpen} setOpen={setIsOpen} group={group} />
    </Paper>
  )
}
