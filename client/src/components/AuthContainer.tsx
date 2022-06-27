import { Box, Flex } from "@chakra-ui/react"
import Logo from "./Logo"

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex justify="center" align="center" minH="100vh">
      <Box p={8} bg="white" maxW="md" w="full" shadow="base" rounded="lg">
        {/* logo  */}
        <Logo />
        <Box mt={4}>{children}</Box>
      </Box>
    </Flex>
  )
}

export default AuthContainer
