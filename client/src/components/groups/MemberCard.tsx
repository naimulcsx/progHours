import { removeMember } from "~/api/groups"
import { DEFAULT_TOAST_OPTIONS } from "~/configs/toast-config"
import { getAvatarColors } from "~/utils/getAvatarColors"
// import {
//   Stack,
//   Avatar,
//   Heading,
//   Badge,
//   Menu,
//   MenuButton,
//   IconButton,
//   MenuList,
//   MenuItem,
//   Text,
//   useToast,
//   useColorModeValue as mode,
// } from "@chakra-ui/react"

import { DotsVerticalIcon, EyeIcon } from "@heroicons/react/outline"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { TrashIcon } from "../Icons"
import { Badge, Button, Menu, Paper, Stack, Text, Title } from "@mantine/core"
import Avatar from "../Avatar"
import { IconDotsVertical, IconMinus, IconUser } from "@tabler/icons"

export default function MemberCard({ user, role, groupId, hashtag }: any) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { bg, color } = getAvatarColors(user.name)
  const { mutate } = useMutation(removeMember, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(`groups/${hashtag}`)
      // toast({ status: "success", title: res.message })
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data?.message || "Something went wrong!"
      // toast({ status: "error", title: errorMessage })
    },
  })
  const handleRemoveUser = () => {
    mutate({ userId: user.id, groupId })
  }
  return (
    <Paper>
      <Stack
        spacing="xs"
        sx={(theme) => ({
          alignItems: "center",
          position: "relative",
          boxShadow: theme.shadows.xs,
          borderRadius: theme.radius.md,
          padding: theme.spacing.lg,
          textAlign: "center",
        })}
      >
        <Avatar name={user.name} width={48} height={48} fontSize={18} />
        <Title order={4}>{user.name}</Title>
        <Badge>{role}</Badge>
        <Text size="sm">{user.username.toUpperCase()}</Text>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button color="gray" variant="subtle" size="xs" sx={{ position: "absolute", top: 8, right: 8, padding: 4 }}>
              <IconDotsVertical size={18} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconUser size={14} />} onClick={() => navigate(`/@${user.username}`)}>
              View Profile
            </Menu.Item>
            <Menu.Item icon={<IconMinus size={14} />} onClick={handleRemoveUser}>
              Remove
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Stack>
    </Paper>
  )
}
