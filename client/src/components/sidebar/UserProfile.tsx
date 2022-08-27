import useLogout from "@/hooks/useLogout"
import { getAvatarColors } from "@/utils/getAvatarColors"
import {
  Avatar,
  Flex,
  HStack,
  Text,
  Button,
  VStack,
  Badge,
} from "@chakra-ui/react"
import { LogoutIcon } from "@heroicons/react/solid"

interface UserProfileProps {
  name: string
  email: string
  role: string
}

export const UserProfile = (props: UserProfileProps) => {
  const { name, email, role } = props
  const { bg, color } = getAvatarColors(name)
  const handleLogout = useLogout()
  return (
    <>
      <VStack align="start">
        <HStack spacing="2" px="2">
          <Avatar name={name} bg={bg} color={color} size="sm" />
          <Flex direction="column" align="start">
            <Text fontWeight="medium">{name}</Text>
            <Badge
              fontSize="12px"
              colorScheme={
                role === "ADMIN" ? "green" : role === "USER" ? "purple" : "gray"
              }
            >
              {role}
            </Badge>
          </Flex>
        </HStack>
      </VStack>
    </>
  )
}
