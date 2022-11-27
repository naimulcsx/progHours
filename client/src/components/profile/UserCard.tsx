import { useState } from "react"
import { Anchor, Badge, Box, Container, Flex, Group, Text, Title } from "@mantine/core"
import { useQuery } from "react-query"

import Avatar from "~/components/Avatar"
import { CCIcon, CFIcon, LightOJIcon, TophIcon } from "~/components/Icons"
import { User } from "~/contexts/UserContext"
import getOJProfileURL from "~/utils/getOJProfileUrl"
import { getHandlesByUsername } from "~/api/handle"

export default function UserCard({ user }: UserCardProps) {
  const [handles, setHandles] = useState([])
  const { username, name, role, memberSince } = user

  useQuery(`handles/${username}`, () => getHandlesByUsername(username), {
    onSuccess(data) {
      setHandles(data?.body.handles)
    },
  })

  return (
    <Box sx={{ marginBottom: 40, marginTop: 80 }}>
      <Container size="xl">
        <Group
          sx={{
            position: "relative",
          }}
        >
          <Avatar name={name} width={96} height={96} fontSize={32} />
          <Box>
            <Group>
              <Title order={2}>{name}</Title>
              <Text>{(role === "ADMIN" || role === "MODERATOR") && <Badge color="violet">{role}</Badge>}</Text>
            </Group>
            <Flex
              align="center"
              sx={(theme) => ({
                gap: 8,
                color: theme.colorScheme === "dark" ? theme.colors.gray[2] : theme.colors.dark[3],
              })}
            >
              <Text>{username.toUpperCase()}</Text>
            </Flex>
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
                  key={idx}
                  py="sm"
                  sx={(theme) => ({
                    background: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.blue[0],
                    border: "1px solid",
                    borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.blue[1],
                  })}
                >
                  <Anchor underline={false} target="_blank" href={getOJProfileURL(item.onlineJudge.name, item.handle)}>
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
  user: User
}
