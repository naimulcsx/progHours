import { useState } from "react"
import { getHandlesByUsername } from "~/api/handle"
import { useQuery } from "react-query"
import { CCIcon, CFIcon, LightOJIcon, TophIcon } from "../Icons"
import getOJProfileURL from "~/utils/getOJProfileUrl"
import Avatar from "../Avatar"
import { Anchor, Badge, Box, Container, Divider, Group, Paper, Text, Title } from "@mantine/core"

export const UserCard: React.FC<UserCardProps> = ({ name, username, role }) => {
  const [handles, setHandles] = useState([])

  /**
   * Get all handles
   */
  useQuery(`handles/${username}`, () => getHandlesByUsername(username), {
    onSuccess(data) {
      setHandles(data?.body.handles)
    },
  })

  return (
    <Box sx={{ marginBottom: 40, marginTop: 80 }}>
      <Container size="xl">
        <Group>
          <Avatar name={name} width={96} height={96} fontSize={32} />
          <Box>
            <Group>
              <Title order={2} sx={{ color: "white" }}>
                {name}
              </Title>
              <Text>{(role === "ADMIN" || role === "MODERATOR") && <Badge color="pink">{role}</Badge>}</Text>
            </Group>
            <Text sx={(theme) => ({ color: theme.colors.dark[0] })}>@{username.toUpperCase()}</Text>
          </Box>
        </Group>
        <Box mt="lg">
          <Group>
            {handles.map((item: any, idx: any) => {
              const iconMap: any = {
                Codeforces: <CFIcon />,
                CodeChef: <CCIcon />,
                Toph: <TophIcon />,
                LightOJ: <LightOJIcon />,
              }
              return (
                <Badge
                  sx={(theme) => ({
                    background: "transparent",
                    border: "1px solid",
                    borderColor: theme.colors.dark[4],
                  })}
                >
                  <Anchor
                    underline={false}
                    target="_blank"
                    href={getOJProfileURL(item.onlineJudge.name, item.handle)}
                    color="violet"
                  >
                    <Group spacing="xs">
                      <Box sx={{ width: 24, height: 24 }}>{iconMap[item.onlineJudge.name]}</Box>
                      <Text sx={{ textDecoration: "none" }}>@{item.handle}</Text>
                    </Group>
                  </Anchor>
                </Badge>
              )
            })}
          </Group>
        </Box>
      </Container>
    </Box>
  )
}

interface UserCardProps {
  name: string
  username: string
  member_since: string
  role: string
}
