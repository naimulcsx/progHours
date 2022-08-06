import useLogout from "@/hooks/useLogout"
import { getAvatarColors } from "@/utils/getAvatarColors"
import { Avatar, Flex, HStack, Text, Button } from "@chakra-ui/react"
import { LogoutIcon } from "@heroicons/react/solid"

interface UserProfileProps {
  name: string
  email: string
}

export const UserProfile = (props: UserProfileProps) => {
  const { name, email } = props
  const { bg, color } = getAvatarColors(name)
  const handleLogout = useLogout()
  return (
    <>
      <HStack spacing="2" px="2">
        <Avatar name={name} bg={bg} color={color} size="sm" />
        <Flex direction="column">
          <Text fontWeight="medium">{name}</Text>
        </Flex>
      </HStack>
    </>
  )
}
