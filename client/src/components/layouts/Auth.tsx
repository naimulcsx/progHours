import { Box, Flex, useColorModeValue as mode } from "@chakra-ui/react"
import Logo from "../Logo"
import { Link } from "react-router-dom"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex justify="center" align="center" minH="100vh">
      <Box
        p={8}
        bg={mode("white", "gray.700")}
        maxW="md"
        w="full"
        shadow="base"
        rounded="lg"
      >
        {/* logo  */}
        <Link to="/leaderboard">
          <Logo />
        </Link>
        <Box mt={4}>{children}</Box>
      </Box>
    </Flex>
  )
}

export default AuthLayout
