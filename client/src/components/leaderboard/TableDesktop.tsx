import { Anchor, Box, Group, HoverCard, Stack, Text } from "@mantine/core"
import { DataGrid, numberFilterFn } from "~/components/datagrid"
import { Link } from "react-router-dom"
import Avatar from "~/components/Avatar"

const LeaderboardTable = ({ data }: any) => {
  return (
    <DataGrid
      sx={(theme) => ({
        background: "white",
        boxShadow: theme.shadows.xs,
      })}
      data={data || []}
      withSorting
      withPagination
      withColumnFilters
      horizontalSpacing="xl"
      pageSizes={["25", "50", "100"]}
      initialState={{ pagination: { pageSize: 25 } }}
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
              <Group position="center" sx={{ overflow: "hidden" }}>
                <HoverCard width={320} shadow="md" openDelay={200} closeDelay={400}>
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
                      <Text sx={{ maxWidth: 240, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {name}
                      </Text>
                    </Box>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Group>
                      <Avatar name={name} />
                      <Stack spacing={5}>
                        <Text
                          size="sm"
                          weight={700}
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: 180,
                            lineHeight: 1,
                          }}
                        >
                          {name}
                        </Text>
                        <Anchor component={Link} to={`/@${username}`} color="dimmed" size="xs" sx={{ lineHeight: 1 }}>
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, eos non! Expedita error,
                      reiciendis, quia illum dolore dolorum quis molestias maiores omnis.
                    </Text>

                    <Group mt="md" spacing="xl">
                      <Text size="sm">
                        <b>
                          {department} {batch}
                        </b>
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
