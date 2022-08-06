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
      borderRadius="lg"
      fontWeight={600}
      lineHeight="1.5rem"
      fontSize="16px"
      letterSpacing={-0.1}
      transition="none"
      aria-current={isActive ? "page" : undefined}
      color={mode("blackAlpha.800", "whiteAlpha.800")}
      _hover={{
        bg: mode("gray.100", "gray.700"),
        color: mode("black", "white"),
      }}
      _activeLink={{
        bg: mode("blue.50", "gray.700"),
        color: mode("blue.500", "white"),
      }}
      {...rest}
    >
      <HStack spacing={3}>
        {icon}
        {label != "" && <Text as="span">{label}</Text>}
      </HStack>
    </Link>
  )
}
