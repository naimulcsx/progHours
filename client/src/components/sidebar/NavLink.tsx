import {
  HStack,
  Link,
  LinkProps,
  useColorModeValue as mode,
  Text,
} from "@chakra-ui/react"
import * as React from "react"

interface NavLinkProps extends LinkProps {
  isActive?: boolean
  label: string
  icon: any
}

export const NavLink = (props: NavLinkProps) => {
  const { icon, isActive, label, ...rest } = props
  return (
    <Link
      display="block"
      py={2}
      px={3}
      borderRadius="md"
      transition="all 0.3s"
      fontWeight="medium"
      lineHeight="1.5rem"
      aria-current={isActive ? "page" : undefined}
      color={mode("blackAlpha.800", "whiteAlpha.800")}
      _hover={{
        bg: mode("gray.100", "gray.700"),
        color: mode("black", "white"),
      }}
      _activeLink={{
        bg: mode("blue.50", "blue.300"),
        color: mode("blue.500", "black"),
      }}
      {...rest}
    >
      <HStack spacing={4}>
        {icon}
        <Text as="span">{label}</Text>
      </HStack>
    </Link>
  )
}
