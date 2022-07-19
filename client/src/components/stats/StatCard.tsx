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
    <Box
      bg={mode("white", "gray.700")}
      p={[4, 4, 4, 4, 6]}
      shadow="base"
      rounded="lg"
    >
      <HStack align="start" spacing={[4, 4, 4, 4, 6]}>
        <Circle
          bg="blue.50"
          color="blue.500"
          rounded="full"
          size={[10, 10, 10, 10, 12]}
        >
          {icon}
        </Circle>
        <Box>
          <Text fontWeight="600" color={mode("gray.700", "gray.400")}>
            {label}
          </Text>
          <Heading
            as="h4"
            fontSize={["xl", "xl", "xl", "xl", "3xl"]}
            mt={[2, 2, 2, 3]}
          >
            {value}
          </Heading>
        </Box>
      </HStack>
    </Box>
  )
}
