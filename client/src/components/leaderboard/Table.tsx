import {
  Anchor,
  Box,
  Button,
  Group,
  HoverCard,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { getAvatarColors } from "@/utils/getAvatarColors"
import { DataGrid, numberFilterFn } from "mantine-data-grid"
import Avatar from "../Avatar"
import { useNavigate } from "react-router-dom"

const LeaderboardTable = ({ data, loading }: any) => {
  const navigate = useNavigate()
  return (
    <DataGrid
      sx={(theme) => ({
        background: "white",
        boxShadow: theme.shadows.sm,
        borderRadius: theme.radius.sm,
      })}
      loading={loading}
      data={data ? data.body.stats : []}
      withPagination
      withColumnFilters
      withSorting
      horizontalSpacing="xl"
      columns={[
        {
          accessorKey: "rank",
          header: "Rank",
          size: 55,
        },
        {
          accessorKey: "user.name",
          header: "Name",
          size: 300,
          cell: ({ cell }) => {
            const { name, department, batch, username } = cell.row.original.user
            return (
              <Group position="center">
                <HoverCard
                  width={320}
                  shadow="md"
                  openDelay={200}
                  closeDelay={400}
                >
                  <HoverCard.Target>
                    <Box
                      sx={(theme) => ({
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        gap: theme.spacing.sm,
                      })}
                    >
                      <Avatar name={name} />
                      <Text>{name}</Text>
                    </Box>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Group>
                      <Avatar name={name} />
                      <Stack spacing={5}>
                        <Text size="sm" weight={700} sx={{ lineHeight: 1 }}>
                          {name}
                        </Text>
                        <Anchor
                          href="https://twitter.com/mantinedev"
                          color="dimmed"
                          size="xs"
                          sx={{ lineHeight: 1 }}
                        >
                          @{username.toUpperCase()}
                        </Anchor>
                      </Stack>
                    </Group>
                    <Text
                      sx={{
                        whiteSpace: "pre-wrap",
                      }}
                      component="p"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dicta, eos non! Expedita error, reiciendis, quia illum
                      dolore dolorum quis molestias maiores omnis.
                    </Text>

                    <Group mt="md" spacing="xl">
                      <Text size="sm">
                        <b>CSE 46</b>
                      </Text>
                      <Text size="sm">
                        <b>{cell.row.original.totalSolved}</b> Problems Solved
                      </Text>
                    </Group>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Group>
            )
          },
        },
        {
          accessorKey: "totalSolved",
          header: "Solved",
          filterFn: numberFilterFn,
        },
        {
          accessorKey: "totalSolveTime",
          header: "Solve Time",
          filterFn: numberFilterFn,
        },
        {
          accessorKey: "averageDifficulty",
          header: "Average Difficulty",
          filterFn: numberFilterFn,
          size: 200,
        },
        {
          accessorKey: "score",
          header: "Score",
          cell: ({ row }) => row.original.score.toFixed(2),
          filterFn: numberFilterFn,
        },
      ]}
    />
  )
}

export default LeaderboardTable
