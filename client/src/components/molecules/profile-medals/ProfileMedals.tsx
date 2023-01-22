import {
  Box,
  createStyles,
  Group,
  Modal,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core"
import { IconCheck, IconX } from "@tabler/icons"
import { useState } from "react"
import {
  Icon1000Solved,
  Icon750Solved,
  Icon500Solved,
  Icon250Solved,
  Icon100Solved,
} from "~/components/atoms/icons"

const medalMap: any = {
  100: {
    icon: <Icon100Solved width="100" height="100" />,
    name: "Solve 100 Problems",
    criteria: "Solve 100 problems",
  },
  250: {
    icon: <Icon250Solved width="100" height="100" />,
    name: "Solve 250 Problems",
    criteria: "Solve 250 problems",
  },
  500: {
    icon: <Icon500Solved width="100" height="100" />,
    name: "Solve 500 Problems",
    criteria: "Solve 500 problems",
  },
  750: {
    icon: <Icon750Solved width="100" height="100" />,
    name: "Solve 750 Problems",
    criteria: "Solve 750 problems",
  },
  1000: {
    icon: <Icon1000Solved width="100" height="100" />,
    name: "Solve 1000 Problems",
    criteria: "Solve 1000 problems",
  },
}

const useStyles = createStyles((theme) => ({
  progressBar: {
    background: `linear-gradient(to right, ${theme.colors.green[4]}, ${theme.colors.green[7]})`,
    boxShadow: `inset 1px 1px 2px 1px ${theme.colors.green[3]}`,
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`,
    },
  },
}))

export default function ProfileMedals({ userStats }: { userStats: any }) {
  const theme = useMantineTheme()
  const [open, setOpen] = useState(false)
  const [medal, setMedal] = useState<any>(null)
  const { classes } = useStyles()
  return (
    <Box>
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
              <Box
                sx={{ opacity: userStats?.totalSolved && userStats.totalSolved >= val ? 1 : 0.2 }}
              >
                {medalMap[val].icon}
              </Box>
              <Text
                mt="sm"
                size="xs"
                sx={(theme) => ({
                  color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.dark[8],
                  fontWeight: 600,
                  cursor: "pointer",
                  opacity: userStats?.totalSolved && userStats.totalSolved >= val ? 1 : 0.2,
                })}
                onClick={() => {
                  setMedal(val)
                  setOpen(true)
                }}
              >
                View Details
              </Text>
            </Paper>
          )
        })}
      </SimpleGrid>

      {/* TODO: Extact this into its own component */}
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title={<Title order={4}>{medalMap[medal]?.name}</Title>}
      >
        {/* Modal content */}
        <Stack>
          <Box>{medalMap[medal]?.icon}</Box>
          <Box>
            <Title order={4} mb="xs">
              Criteria
            </Title>
            <Group spacing="xs" mb="md">
              {userStats.totalSolved < parseInt(medal) ? (
                <IconX size={16} />
              ) : (
                <IconCheck size={16} />
              )}
              <Text>{medalMap[medal]?.criteria}</Text>
            </Group>

            <Title order={4} mb="xs">
              Progress
            </Title>

            <Group position="apart">
              <Text size="xs" weight={700} mb="xs">
                {Math.min(userStats.totalSolved, medal)} / {medal} solved
              </Text>
            </Group>
            <Progress
              classNames={{ bar: classes.progressBar }}
              size="lg"
              sections={[
                {
                  value: (userStats.totalSolved / parseInt(medal)) * 100,
                  color: theme.colors.green[8],
                },
              ]}
            />
          </Box>
        </Stack>
      </Modal>
    </Box>
  )
}
