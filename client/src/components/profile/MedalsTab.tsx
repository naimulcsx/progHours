import { Box, Group, Modal, Paper, SimpleGrid, Stack, Text, Title, useMantineTheme } from "@mantine/core"
import { IconCheck, IconX } from "@tabler/icons"
import { useState } from "react"
import Icon1000Solved from "~/components/assets/medals/Icon1000Solved"
import Icon100Solved from "~/components/assets/medals/Icon100Solved"
import Icon250Solved from "~/components/assets/medals/Icon250Solved"
import Icon500Solved from "~/components/assets/medals/Icon500Solved"
import Icon750Solved from "~/components/assets/medals/Icon750Solved"

const medalMap: any = {
  100: {
    icon: <Icon100Solved width="100" height="100" />,
    name: "Solve 100 Problems",
    criteria: "Solve at least 100 problems",
  },
  250: {
    icon: <Icon250Solved width="100" height="100" />,
    name: "Solve 250 Problems",
    criteria: "Solve at least 250 problems",
  },
  500: {
    icon: <Icon500Solved width="100" height="100" />,
    name: "Solve 500 Problems",
    criteria: "Solve at least 500 problems",
  },
  750: {
    icon: <Icon750Solved width="100" height="100" />,
    name: "Solve 750 Problems",
    criteria: "Solve at least 750 problems",
  },
  1000: {
    icon: <Icon1000Solved width="100" height="100" />,
    name: "Solve 1000 Problems",
    criteria: "Solve at least 1000 problems",
  },
}

export default function MedalsTab({ userStats }: { userStats: any }) {
  const theme = useMantineTheme()
  const [open, setOpen] = useState(false)
  const [medal, setMedal] = useState<any>(null)
  return (
    <Box>
      <Title order={3} mb="md" sx={{ color: "white" }}>
        Unlocked
      </Title>
      {/* empty text */}
      {userStats?.totalSolved < 100 && <Text>No medals yet.</Text>}

      {/* unlocked medals */}
      <SimpleGrid
        mb="md"
        cols={6}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1024, cols: 4, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
        ]}
      >
        {[100, 250, 500, 750, 1000].map((val: any) => {
          if (userStats?.totalSolved && userStats.totalSolved >= val) {
            return (
              <Paper
                key={val}
                p="xl"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box>{medalMap[val].icon}</Box>
                <Text
                  mt="sm"
                  size="xs"
                  sx={{ color: theme.colors.dark[0], fontWeight: 600, cursor: "pointer" }}
                  onClick={() => {
                    setMedal(val)
                    setOpen(true)
                  }}
                >
                  View Details
                </Text>
              </Paper>
            )
          }
        })}
      </SimpleGrid>

      {/* locked medals */}
      <Title order={3} mb="md" sx={{ color: "white" }}>
        Locked
      </Title>
      <SimpleGrid
        cols={6}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1024, cols: 4, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
        ]}
      >
        {[100, 250, 500, 750, 1000].map((val: any) => {
          if (userStats?.totalSolved && userStats.totalSolved < val) {
            return (
              <Paper
                key={val}
                p="xl"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ opacity: 0.25 }}>{medalMap[val].icon}</Box>
                <Text
                  mt="sm"
                  size="xs"
                  sx={{ color: theme.colors.dark[0], fontWeight: 600, cursor: "pointer" }}
                  onClick={() => {
                    setMedal(val)
                    setOpen(true)
                  }}
                >
                  View Details
                </Text>
              </Paper>
            )
          }
        })}
        <Paper p="xl" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Text size="sm" sx={{ fontStyle: "italic" }}>
            More coming...
          </Text>
        </Paper>
      </SimpleGrid>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title={
          <Title order={4} sx={{ color: "white" }}>
            {medalMap[medal]?.name}
          </Title>
        }
      >
        {/* Modal content */}
        <Stack>
          <Box>{medalMap[medal]?.icon}</Box>
          <Box>
            <Title order={4} sx={{ color: "white" }} mb="xs">
              Criteria
            </Title>
            <Group spacing="xs">
              {userStats.totalSolved < parseInt(medal) ? <IconX size={16} /> : <IconCheck size={16} />}
              <Text>{medalMap[medal]?.criteria}</Text>
            </Group>
          </Box>
        </Stack>
      </Modal>
    </Box>
  )
}
