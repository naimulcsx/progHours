import {
  Solved50,
  Solved100,
  Solved250,
  Solved500,
  Solved1000,
} from "~/assets/achievements/SolveCount"
import type { User } from "~/contexts/UserContext"
import { Box, Group, Table, Text, Title } from "@mantine/core"
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
    <>
      <Box>
        <Title order={5}>Name</Title>
        <Text>{user.name}</Text>
      </Box>
      <Box>
        <Title order={5}>University ID</Title>
        <Text>{user.username.toUpperCase()}</Text>
      </Box>
      <Box>
        <Title order={5}>Department</Title>
        <Text>{user.department || "—"}</Text>
      </Box>
      <Box>
        <Title order={5}>Email</Title>
        <Text>{user.email}</Text>
      </Box>

      <Box>
        <Title order={5}>Batch</Title>
        <Text>{user.batch || "—"}</Text>
      </Box>
      <Box>
        <Title order={5}>Member Since</Title>
        <Text>{moment(user.memberSince).fromNow()}</Text>
      </Box>
    </>
  )
}
