import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/outline"
import {
  Anchor,
  Badge,
  Box,
  Button,
  Menu,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { IconDotsVertical, IconTrash } from "@tabler/icons"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DeleteGroupModal } from "../modals/DeleteGroupModal"

const GroupCard = ({ group, role }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <Box
      p="lg"
      sx={(theme) => ({
        background: "white",
        position: "relative",
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.xs,
      })}
      key={group.id}
    >
      <Stack align="flex-start" spacing={"xs"}>
        <Anchor
          component={Link}
          to={`/groups/${group.hashtag}`}
          sx={{ "&:hover": { textDecoration: "none" } }}
        >
          <Title order={3} color="black">
            {group.name}
          </Title>
        </Anchor>

        <Anchor
          component={Link}
          to={`/groups/${group.hashtag}`}
          sx={{ "&:hover": { textDecoration: "none" } }}
        >
          <Text
            sx={(theme) => ({ fontWeight: 600, color: theme.colors.blue[6] })}
          >
            #{group.hashtag}
          </Text>
        </Anchor>
        <Badge color="pink">{role}</Badge>
      </Stack>

      <Menu>
        <Menu.Target>
          <Button
            px="sm"
            variant="white"
            color="gray"
            sx={{ position: "absolute", top: 4, right: 2 }}
          >
            <IconDotsVertical size={20} />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            icon={<IconTrash size={14} />}
            onClick={() => setIsOpen(true)}
          >
            Delete Group
          </Menu.Item>

          {/* Other items ... */}
        </Menu.Dropdown>
      </Menu>

      {/* delete popup */}
      <DeleteGroupModal
        id={group.id}
        name={group.name}
        hashtag={group.hashtag}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </Box>
  )
}

export default GroupCard
