import { removeMember } from "~/api/groups"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { Badge, Button, Menu, Paper, Stack, Text, Title } from "@mantine/core"
import { IconDotsVertical, IconMinus, IconUser } from "@tabler/icons"
import showToast from "~/utils/showToast"
import Avatar from "../Avatar"
import { useState } from "react"
import { RemoveMemberModal } from "../modals/RemoveMemberModal"
import UserGroups from "~/types/UserGroup"
import Groups from "~/types/Group"

interface Props {
  userGroup: UserGroups
  group: Groups
  isOwner: boolean
}

export default function MemberCard({ userGroup, group, isOwner }: Props) {
  const navigate = useNavigate()
  const [opened, setOpened] = useState(false)
  const user = userGroup?.user

  return (
    <>
      <Paper sx={{ cursor: "pointer" }} onClick={() => navigate(`/${user.username.toUpperCase()}`)}>
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
          <Badge>{userGroup?.role}</Badge>
          <Text size="sm">{user.username.toUpperCase()}</Text>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button
                color="gray"
                variant="subtle"
                size="xs"
                sx={{ position: "absolute", top: 8, right: 8, padding: 4 }}
                onClick={(e) => e.stopPropagation()}
              >
                <IconDotsVertical size={18} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconUser size={14} />}
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/${user.username}`)
                }}
              >
                View Profile
              </Menu.Item>
              {isOwner && (
                <Menu.Item
                  icon={<IconMinus size={14} />}
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpened(true)
                  }}
                >
                  Remove
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </Stack>
      </Paper>

      {group && user && <RemoveMemberModal isOpen={opened} setIsOpen={setOpened} data={{ group, user }} />}
    </>
  )
}
