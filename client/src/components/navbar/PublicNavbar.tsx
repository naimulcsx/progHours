import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Link,
  useColorMode,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@heroicons/react/solid"
import { Link as ReactRouterLink } from "react-router-dom"
import Logo from "../Logo"

export const PublicNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex
      as="header"
      position="fixed"
      left={0}
      right={0}
      top={0}
      bg={mode("white", "gray.800")}
      h={14}
      borderBottom="1px solid"
      borderColor={mode("gray.200", "gray.700")}
      alignItems="center"
      zIndex={200}
    >
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <ReactRouterLink to="/">
            <Logo />
          </ReactRouterLink>
          <Box>
            <HStack spacing={8}>
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
              <Link fontWeight="500" as={ReactRouterLink} to="/login">
                Login
              </Link>
              <Link fontWeight="500" as={ReactRouterLink} to="/register">
                Register
              </Link>
            </HStack>
          </Box>
        </Flex>
      </Container>
    </Flex>
  )
}
