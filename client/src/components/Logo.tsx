import { Box, Text, Heading, HStack } from "@chakra-ui/react"
import { LogoIcon } from "./Icons"

const Logo = () => {
  return (
    <HStack spacing={3} color="blue.500">
      {/* color of the logo is picked from its parents text-color */}
      <LogoIcon width={32} height={32} />
      <Box>
        <Heading size="md">progHours</Heading>
        <Text fontSize="10px">v1.0.0 RC1</Text>
      </Box>
    </HStack>
  )
}

export default Logo
