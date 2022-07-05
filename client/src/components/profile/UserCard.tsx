import { GlobalContext } from "@/GlobalStateProvider"
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import * as React from "react"
import { HiPencilAlt } from "react-icons/hi"
import { UserInfo } from "./UserInfo"
import moment from "moment"
import { Container } from "@chakra-ui/react"
import { getAvatarColors } from "@/utils/getAvatarColors"

export const UserCard: React.FC<UserCardProps> = ({
  name,
  username,
  member_since,
}) => {
  const { bg, color } = getAvatarColors(name)
  return (
    <Box as="section" pt="40" pb="12" position="relative">
      <Box
        position="absolute"
        inset="0"
        height="64"
        bg="blue.50"
        backgroundImage="url(/bg-profile.png)"
        shadow="base"
      />
      <Container position="relative" zIndex={100}>
        <Flex pt="28" gap={6}>
          <Avatar
            mt="-10"
            borderWidth="6px"
            borderColor={useColorModeValue("white", "gray.700")}
            size="2xl"
            bg={bg}
            color={color}
            name={name}
          />
          <Box>
            <Heading size="lg" fontWeight={600} letterSpacing="tight">
              {name}
            </Heading>
            <Text color={useColorModeValue("gray.600", "gray.400")}>
              {username.toUpperCase()}
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

interface UserCardProps {
  name: string
  username: string
  member_since: string
}
