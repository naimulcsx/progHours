import {
  Solved50,
  Solved100,
  Solved250,
  Solved500,
  Solved1000,
} from "@/assets/achievements/SolveCount"
import { User } from "@/GlobalStateProvider"
import {
  Table,
  Tbody,
  Tr,
  Th,
  Tooltip,
  Td,
  HStack,
  Box,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import { LockClosedIcon } from "@heroicons/react/outline"
import moment from "moment"

const achievementsBySolveCount = [
  {
    count: 50,
    badge: <Solved50 />,
  },
  {
    count: 100,
    badge: <Solved100 />,
  },
  {
    count: 250,
    badge: <Solved250 />,
  },
  {
    count: 500,
    badge: <Solved500 />,
  },
  {
    count: 1000,
    badge: <Solved1000 />,
  },
]

export const UserAbout = ({
  user,
  userStats,
}: {
  user: User
  userStats: any
}) => {
  return (
    <Table>
      <Tbody borderColor={"red"}>
        <Tr>
          <Th borderColor={mode("gray.200", "gray.700")}>
            <Tooltip label="More medals are coming soon!">Achievements</Tooltip>
          </Th>
          <Td borderColor={mode("gray.200", "gray.700")}>
            <HStack spacing="8">
              {achievementsBySolveCount.map((el, idx) => {
                const isUnlocked = userStats.totalSolved > el.count
                return (
                  <Tooltip
                    key={idx}
                    label={
                      isUnlocked
                        ? `Solved ${el.count} problems!`
                        : `Solve ${
                            el.count - userStats.totalSolved
                          } problems to unlock!`
                    }
                  >
                    <Box position="relative">
                      <Box h="24" opacity={isUnlocked ? "1" : "0.25"}>
                        {el.badge}
                      </Box>
                      <Box
                        color="gray.700"
                        position="absolute"
                        left="50%"
                        top="40%"
                        transform="translate(-50%, -50%)"
                      >
                        {!isUnlocked && (
                          <LockClosedIcon width={28} height={28} />
                        )}
                      </Box>
                    </Box>
                  </Tooltip>
                )
              })}
            </HStack>
          </Td>
        </Tr>
        <Tr>
          <Th borderColor={mode("gray.200", "gray.700")}>Full Name</Th>
          <Td borderColor={mode("gray.200", "gray.700")}>{user.name}</Td>
        </Tr>
        <Tr>
          <Th borderColor={mode("gray.200", "gray.700")}>University ID</Th>
          <Td borderColor={mode("gray.200", "gray.700")}>
            {user.username.toUpperCase()}
          </Td>
        </Tr>
        <Tr>
          <Th borderColor={mode("gray.200", "gray.700")}>Department</Th>
          <Td borderColor={mode("gray.200", "gray.700")}>
            {user.department || "—"}
          </Td>
        </Tr>
        <Tr>
          <Th borderColor={mode("gray.200", "gray.700")}>Email</Th>
          <Td borderColor={mode("gray.200", "gray.700")}>{user.email}</Td>
        </Tr>

        <Tr>
          <Th borderColor={mode("gray.200", "gray.700")}>Batch</Th>
          <Td borderColor={mode("gray.200", "gray.700")}>
            {user.batch || "—"}
          </Td>
        </Tr>
        <Tr>
          <Th borderColor={mode("gray.200", "gray.700")}>Member Since</Th>
          <Td borderColor={mode("gray.200", "gray.700")}>
            {moment(user.memberSince).fromNow()}
          </Td>
        </Tr>
      </Tbody>
    </Table>
  )
}
