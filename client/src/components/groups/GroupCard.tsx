import { Anchor, Badge, Button, Group, Menu, Paper, Stack, Text, Title } from "@mantine/core"
import { IconDotsVertical, IconTrash } from "@tabler/icons"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DeleteGroupModal } from "../modals/DeleteGroupModal"

const GroupCard = ({ group, role }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <Paper
      p="lg"
      sx={(theme) => ({
        position: "relative",
        borderRadius: theme.radius.md,
      })}
      key={group.id}
    >
      <Stack align="flex-start" spacing={"xs"}>
        <Anchor component={Link} to={`/groups/${group.hashtag}`} sx={{ "&:hover": { textDecoration: "none" } }}>
          <Title order={4}>{group.name}</Title>
        </Anchor>

        <Anchor component={Link} to={`/groups/${group.hashtag}`} sx={{ "&:hover": { textDecoration: "none" } }}>
          <Text sx={(theme) => ({ fontWeight: 600 })}>#{group.hashtag}</Text>
        </Anchor>
        <Badge color="pink">{role}</Badge>
        <Group>
          <Text color="blue" size="sm">
            {group.users.filter((item: any) => item.role === "MEMBER").length} members
          </Text>
        </Group>
      </Stack>

      <Menu>
        <Menu.Target>
          <Button color="gray" variant="subtle" size="xs" sx={{ position: "absolute", top: 8, right: 8, padding: 4 }}>
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
      <DeleteGroupModal id={group.id} name={group.name} hashtag={group.hashtag} isOpen={isOpen} setIsOpen={setIsOpen} />
    </Paper>
  )
}

export default GroupCard
