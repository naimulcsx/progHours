import { removeMember } from "~/api/groups"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { Badge, Button, Menu, Paper, Stack, Text, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core"
import { IconDotsVertical, IconMinus, IconUser } from "@tabler/icons"
import showToast from "~/utils/showToast"
import Avatar from "../Avatar"

export default function MemberCard({ user, role, groupId, isOwner, hashtag }: any) {
  const theme = useMantineTheme()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate } = useMutation(removeMember, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(`groups/${hashtag}`)
      showToast("success", "Member removed!")
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data?.message || "Something went wrong!"
      showToast("error", errorMessage)
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
          borderRadius: theme.radius.md,
          padding: theme.spacing.lg,
          textAlign: "center",
        })}
      >
        <Avatar name={user.name} width={48} height={48} fontSize={18} />
        <Title order={4}>{user.name}</Title>
        <Badge color={theme.colorScheme === "dark" ? "indigo" : "blue"}>{role}</Badge>
        <Text size="sm">{user.username.toUpperCase()}</Text>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button color="gray" variant="subtle" size="xs" sx={{ position: "absolute", top: 8, right: 8, padding: 4 }}>
              <IconDotsVertical size={18} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconUser size={14} />} onClick={() => navigate(`/${user.username}`)}>
              View Profile
            </Menu.Item>
            {isOwner && (
              <Menu.Item icon={<IconMinus size={14} />} onClick={handleRemoveUser}>
                Remove
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Stack>
    </Paper>
  )
}
