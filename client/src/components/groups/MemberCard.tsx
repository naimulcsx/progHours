import { removeMember } from "~/api/groups"
import { DEFAULT_TOAST_OPTIONS } from "~/configs/toast-config"
import { getAvatarColors } from "~/utils/getAvatarColors"
import {
  Stack,
  Avatar,
  Heading,
  Badge,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Text,
  useToast,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import { DotsVerticalIcon, EyeIcon } from "@heroicons/react/outline"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { TrashIcon } from "../Icons"

export default function MemberCard({ user, role, groupId, hashtag }: any) {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { bg, color } = getAvatarColors(user.name)
  const { mutate } = useMutation(removeMember, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(`groups/${hashtag}`)
      toast({ status: "success", title: res.message })
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.message || "Something went wrong!"
      toast({ status: "error", title: errorMessage })
    },
  })
  const handleRemoveUser = () => {
    mutate({ userId: user.id, groupId })
  }
  return (
    <Stack
      position="relative"
      bg={mode("white", "gray.700")}
      p={6}
      shadow="base"
      rounded="lg"
      align="center"
    >
      <Avatar name={user.name} size="lg" bg={bg} color={color} />
      <Heading size="md" textAlign="center">
        {user.name}
      </Heading>
      <Badge colorScheme="purple">{role}</Badge>
      <Text>{user.username.toUpperCase()}</Text>
      <Menu>
        <MenuButton
          position="absolute"
          right={2}
          top={0}
          as={IconButton}
          aria-label="Options"
          icon={<DotsVerticalIcon height={20} />}
          variant="ghost"
          colorScheme="gray"
          size="sm"
        />
        <MenuList>
          <MenuItem
            icon={<EyeIcon height={20} />}
            onClick={() => navigate(`/users/${user.username}`)}
          >
            View Profile
          </MenuItem>
          <MenuItem icon={<TrashIcon height={20} />} onClick={handleRemoveUser}>
            Remove
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  )
}
