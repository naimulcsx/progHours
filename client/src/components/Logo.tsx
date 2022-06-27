import { Box, Heading, HStack } from "@chakra-ui/react"
import { LogoIcon } from "./Icons"

const Logo = () => {
  return (
    <HStack spacing={3} color="blue.500">
      {/* color of the logo is picked from its parents text-color */}
      <LogoIcon width={32} height={32} />
      <Heading size="md">progHours</Heading>
    </HStack>
  )
}

export default Logo
