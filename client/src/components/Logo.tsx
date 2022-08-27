import {
  Box,
  Text,
  Heading,
  HStack,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import { LogoIcon } from "./Icons"
const Logo = () => {
  return (
    <HStack spacing={3} color={mode("blue.500", "white")}>
      {/* color of the logo is picked from its parents text-color */}
      <Box color="blue.500">
        <LogoIcon width={32} height={32} />
      </Box>
      <Box>
        <Heading size="md">progHours</Heading>
        <Text fontSize="10px">v0.2.3</Text>
      </Box>
    </HStack>
  )
}

export default Logo
