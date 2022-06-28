import {
  HStack,
  Icon,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import * as React from "react"
import { HiCalendar, HiLink, HiLocationMarker } from "react-icons/hi"
import { CalendarIcon } from "@heroicons/react/solid"

interface UserInfoProps extends StackProps {
  location: string
  website: string
  memberSince: string
}

export const UserInfo = (props: UserInfoProps) => {
  const { location, website, memberSince, ...stackProps } = props
  return (
    <Stack
      direction={{ base: "column", sm: "row" }}
      spacing={{ base: "1", sm: "6" }}
      mt="4"
      fontSize="sm"
      fontWeight="medium"
      color={useColorModeValue("blue.600", "blue.300")}
      {...stackProps}
    >
      <HStack>
        <Icon as={HiLink} />
        <Text>{website}</Text>
      </HStack>
      <HStack>
        <Icon as={CalendarIcon} />
        <Text>{memberSince}</Text>
      </HStack>
    </Stack>
  )
}
