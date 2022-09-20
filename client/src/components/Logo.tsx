import { Heading, HStack, useColorModeValue as mode } from "@chakra-ui/react"
import { Box, Code, Group, Text, Title } from "@mantine/core"
import { FC, SVGProps } from "react"

const LogoIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="currentColor"
        d="M21 1.732a6 6 0 016 0l14.785 8.536a6 6 0 013 5.196v17.071a6 6 0 01-3 5.197L27 46.267a6 6 0 01-6 0L6.215 37.733a6 6 0 01-3-5.197V15.464a6 6 0 013-5.197L21 1.732z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.75"
        d="M24 36c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.75"
        d="M23 18v6.25L28 28"
      ></path>
    </svg>
  )
}

const Logo = () => {
  return (
    <Group
      align="center"
      spacing="sm"
      sx={(theme) => ({ color: theme.colors[theme.primaryColor][5] })}
    >
      {/* color of the logo is picked from its parents text-color */}
      <Box sx={(theme) => ({ color: theme.colors[theme.primaryColor][5] })}>
        <LogoIcon width={32} height={32} />
      </Box>
      <Box>
        <Title order={4} style={{ lineHeight: 1.15 }}>
          progHours
        </Title>
        <Text sx={{ fontSize: "10px" }}>v0.2.3</Text>
      </Box>
    </Group>
  )
}

export default Logo
