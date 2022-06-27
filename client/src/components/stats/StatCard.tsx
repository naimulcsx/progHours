import {
  Box,
  Circle,
  HStack,
  Text,
  Heading,
  useColorModeValue as mode,
} from "@chakra-ui/react"

export const StatCard = (props: any) => {
  const { data, icon } = props
  const { label, value } = data
  return (
    <Box bg={mode("white", "gray.700")} p={6} shadow="base" rounded="lg">
      <HStack align="start" spacing={6}>
        <Circle bg="blue.50" color="blue.500" rounded="full" size="12">
          {icon}
        </Circle>
        <Box>
          <Text fontWeight="600" color={mode("gray.700", "gray.400")}>
            {label}
          </Text>
          <Heading as="h4" size="lg" my="3">
            {value}
          </Heading>
        </Box>
      </HStack>
    </Box>
  )
}
