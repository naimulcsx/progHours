import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  Tooltip,
  useColorModeValue,
  Container,
  useColorMode,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import { useState } from "react"
import { getAvatarColors } from "@/utils/getAvatarColors"
import { getHandlesByUsername } from "@/api/handle"
import { useQuery } from "react-query"
import { CCIcon, CFIcon, LightOJIcon, TophIcon } from "../Icons"
import getOJProfileURL from "@/utils/getOJProfileUrl"
import { useBreakpointValue } from "@chakra-ui/media-query"

export const UserCard: React.FC<UserCardProps> = ({ name, username }) => {
  const [handles, setHandles] = useState([])
  const { colorMode } = useColorMode()

  /**
   * Get all handles
   */
  useQuery("handles", () => getHandlesByUsername(username), {
    onSuccess(data) {
      setHandles(data?.body.handles)
    },
  })

  return (
    <Box as="section" pt="24" pb="8" position="relative">
      <Box
        position="absolute"
        inset="0"
        height="48"
        bg={mode("white", "gray.700")}
        backgroundImage={
          colorMode == "light"
            ? "url(/bg-profile.png)"
            : "url(/bg-profile-dark.png)"
        }
        shadow="base"
      />
      <Container position="relative" zIndex={100}>
        <Flex
          pt="28"
          gap={6}
          justifyContent="space-between"
          flexDirection={{ base: "column", md: "row", lg: "row" }}
        >
          <Flex columnGap={4}>
            <Avatar
              mt={[-10, -12]}
              borderWidth="6px"
              borderColor={useColorModeValue("white", "gray.700")}
              size={useBreakpointValue({ base: "xl", md: "2xl" })}
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

          <Box>
            <Flex columnGap={4}>
              {handles.map((item: any) => {
                const iconMap: any = {
                  Codeforces: <CFIcon />,
                  CodeChef: <CCIcon />,
                  Toph: <TophIcon />,
                  LightOJ: <LightOJIcon />,
                }
                return (
                  <Tooltip
                    hasArrow
                    label={item.handle}
                    bg="gray.700"
                    color="white"
                  >
                    <a
                      target={"_blank"}
                      href={getOJProfileURL(item.onlineJudge.name, item.handle)}
                    >
                      <Box
                        h={12}
                        w={12}
                        p={2}
                        bg="white"
                        rounded="full"
                        border="1px"
                        borderColor="gray.300"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {iconMap[item.onlineJudge.name]}
                      </Box>
                    </a>
                  </Tooltip>
                )
              })}
            </Flex>
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
