import { getAvatarColors } from "@/utils/getAvatarColors"
import {
  Avatar,
  AvatarProps,
  Box,
  Flex,
  FlexProps,
  useColorModeValue,
} from "@chakra-ui/react"
import * as React from "react"

interface CardWithAvatarProps extends FlexProps {
  avatarProps: AvatarProps
  action?: React.ReactNode
}

export const CardWithAvatar = (props: CardWithAvatarProps) => {
  const { action, avatarProps, children, ...rest } = props
  const { bg, color } = getAvatarColors(avatarProps.name!)
  return (
    <Flex
      position="relative"
      direction="column"
      align={{ sm: "center" }}
      maxW="2xl"
      mx="auto"
      bg={useColorModeValue("white", "gray.700")}
      shadow={{ sm: "base" }}
      rounded={{ sm: "lg" }}
      px={{ base: "6", md: "8" }}
      pb={{ base: "6", md: "8" }}
      {...rest}
    >
      <Avatar
        mt="-10"
        borderWidth="6px"
        borderColor={useColorModeValue("white", "gray.700")}
        size="xl"
        bg={bg}
        color={color}
        {...avatarProps}
      />
      <Box position="absolute" top="4" insetEnd={{ base: "6", md: "8" }}>
        {action}
      </Box>
      {children}
    </Flex>
  )
}
