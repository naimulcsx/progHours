import { GlobalContext } from "@/GlobalStateProvider"
import { Box, Button, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import * as React from "react"
import { HiPencilAlt } from "react-icons/hi"
import { CardWithAvatar } from "./CardWithAvatar"
import { UserInfo } from "./UserInfo"
import moment from "moment"

export const UserCard: React.FC<UserCardProps> = ({
  name,
  username,
  member_since,
}) => {
  return (
    <Box as="section" pt="40" pb="12" position="relative">
      <Box position="absolute" inset="0" height="64" bg="blue.600" />
      <CardWithAvatar
        maxW="xl"
        avatarProps={{
          name: name,
        }}
      >
        <Box textAlign={{ sm: "center" }} pt="2">
          <Heading size="lg" fontWeight={600} letterSpacing="tight">
            {name}
          </Heading>
          <Text color={useColorModeValue("gray.600", "gray.400")}>
            {username.toUpperCase()}
          </Text>
          <UserInfo
            location="Memphis, USA"
            website="esther.com"
            memberSince={`Joined ${moment(member_since).format("MMM YYYY")}`}
          />
        </Box>
      </CardWithAvatar>
    </Box>
  )
}

interface UserCardProps {
  name: string
  username: string
  member_since: string
}
