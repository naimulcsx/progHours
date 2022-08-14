import { useContext } from "react"
import { Link } from "react-router-dom"

/**
 * Import components
 */
import Logo from "../Logo"
import { GlobalContext } from "@/GlobalStateProvider"
import {
  Box,
  Stack,
  Avatar,
  Text,
  HStack,
  Spinner,
  Show,
  useColorMode,
  Button,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import { getAvatarColors } from "@/utils/getAvatarColors"
import NavbarMenu from "./NavbarMenu"
import { MoonIcon, SunIcon } from "@heroicons/react/outline"

const Navbar = () => {
  const { user } = useContext(GlobalContext)
  // const { bg, color } = getAvatarColors(user?.name!)
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box
      as="header"
      position="fixed"
      bg={mode("white", "gray.800")}
      left={0}
      right={0}
      px={5}
      height={14}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor={mode("gray.200", "gray.700")}
      zIndex={200}
    >
      <Box>
        <Link to="/dashboard">
          <Logo />
        </Link>
      </Box>
      <Box as="nav">
        <Stack direction="row" alignItems="center" spacing={6}>
          <Button
            onClick={toggleColorMode}
            variant="unstyled"
            display="flex"
            size="sm"
            color={mode("gray.600", "white")}
          >
            {colorMode === "light" ? (
              <MoonIcon height={20} />
            ) : (
              <SunIcon height={20} />
            )}
          </Button>
          <Box display="flex" gap={2}>
            {user ? (
              <Link to={`/users/${user.username!}`}>
                <HStack spacing={2}>
                  <Avatar name={user.name!} size="sm" fontWeight="bold" />
                  <Show above="md">
                    <Text>{user.name!}</Text>
                  </Show>
                </HStack>
              </Link>
            ) : (
              <Spinner />
            )}
            <NavbarMenu />
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default Navbar
