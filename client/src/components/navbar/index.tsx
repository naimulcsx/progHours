import { useContext } from "react"
import { Link } from "react-router-dom"

/**
 * Import components
 */
import Logo from "../Logo"
import DropdownMenu from "../DropdownMenu"
import { GlobalContext } from "@/GlobalStateProvider"
import Spinner from "../Spinner"
import { Box, Stack, Avatar, Text, HStack } from "@chakra-ui/react"
import { getAvatarColors } from "@/utils/getAvatarColors"

const Navbar = () => {
  const { user } = useContext(GlobalContext)
  const { bg, color } = getAvatarColors(user?.name!)
  return (
    <Box
      as="header"
      position="fixed"
      bg="white"
      left={0}
      right={0}
      px={6}
      py={3}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="gray.200"
      zIndex={100}
    >
      <Box>
        <Link to="/dashboard">
          <Logo />
        </Link>
      </Box>
      <Box as="nav">
        <Stack direction="row" alignItems="center">
          {user ? (
            <Link to={`/users/${user.username!}`}>
              <HStack spacing={2}>
                <Avatar name={user.name!} size="sm" bg={bg} color={color} />
                <Text>{user.name!}</Text>
              </HStack>
            </Link>
          ) : (
            <Spinner />
          )}

          <DropdownMenu />
        </Stack>
      </Box>
    </Box>
  )
}

export default Navbar
