import {
  Anchor,
  Box,
  Button,
  Group,
  HoverCard,
  Stack,
  Text,
} from "@mantine/core"
import { DataGrid, numberFilterFn } from "~/components/datagrid"
import { useNavigate } from "react-router-dom"
import Avatar from "~/components/Avatar"

const LeaderboardTableMobile = ({ data }: any) => {
  const navigate = useNavigate()
  return (
    <DataGrid
      sx={(theme) => ({
        background: "white",
        boxShadow: theme.shadows.xs,
      })}
      data={data || []}
      withPagination
      horizontalSpacing="md"
      pageSizes={["25", "50", "100"]}
      initialState={{ pagination: { pageSize: 25 } }}
      columns={[
        {
          accessorKey: "user.name",
          header: "Name",
          size: 230,
          cell: ({ cell }) => {
            const { name, department, batch, username } = cell.row.original.user
            return (
              <Group position="center" sx={{ overflow: "hidden" }}>
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
                      <Text
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: 180,
                        }}
                      >
                        {name}
                      </Text>
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
                          href={`/@${username}`}
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
          accessorKey: "score",
          header: "Score",
          size: 80,
          cell: ({ row }) => {
            const value = row.original.score.toFixed(2)
            return (
              <HoverCard width={200} shadow="md">
                <HoverCard.Target>
                  <Text>{value}</Text>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size="sm">
                    <span style={{ fontWeight: 500 }}>Total Solved:</span>{" "}
                    {row.original.totalSolved}
                  </Text>
                  <Text>
                    <span style={{ fontWeight: 500 }}>Solve Time:</span>{" "}
                    {row.original.totalSolveTime}
                  </Text>
                  <Text>
                    <span style={{ fontWeight: 500 }}>Average Difficulty:</span>{" "}
                    {row.original.averageDifficulty}
                  </Text>
                </HoverCard.Dropdown>
              </HoverCard>
            )
          },
          filterFn: numberFilterFn,
        },
      ]}
    />
  )
}

export default LeaderboardTableMobile
