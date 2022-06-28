import { useContext } from "react"
import { Link } from "react-router-dom"

/**
 * Import components
 */
import Logo from "../Logo"
import { GlobalContext } from "@/GlobalStateProvider"
import { Box, Stack, Avatar, Text, HStack, Spinner } from "@chakra-ui/react"
import { getAvatarColors } from "@/utils/getAvatarColors"
import NavbarMenu from "./NavbarMenu"

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
      px={5}
      height={14}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="gray.200"
      zIndex={200}
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
          <NavbarMenu />
        </Stack>
      </Box>
    </Box>
  )
}

export default Navbar
