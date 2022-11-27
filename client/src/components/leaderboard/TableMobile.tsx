import { Box, HoverCard, Text } from "@mantine/core"
import { Link, useNavigate } from "react-router-dom"

import { DataGrid, numberFilterFn } from "~/components/datagrid"
import Avatar from "~/components/Avatar"

const LeaderboardTableMobile = ({ data }: any) => {
  const navigate = useNavigate()
  return (
    <DataGrid
      sx={(theme) => ({
        background: "white",
        boxShadow: theme.shadows.xs,
      })}
      data={data}
      withPagination
      verticalSpacing="sm"
      horizontalSpacing="md"
      pageSizes={["25", "50", "100"]}
      initialState={{ pagination: { pageSize: 25 } }}
      columns={[
        {
          accessorKey: "user.name",
          header: "Name",
          size: 230,
          cell: ({ cell }) => {
            const { name, username } = cell.row.original.user
            return (
              <Box
                component={Link}
                to={`/@${username.toUpperCase()}`}
                sx={{ textDecoration: "none" }}
                title="Visit profile"
              >
                <Box
                  sx={(theme) => ({
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing.sm,
                  })}
                >
                  <Avatar name={name} />
                  <Box>
                    <Text
                      sx={(theme) => ({
                        maxWidth: 200,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontWeight: 500,
                        color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
                      })}
                    >
                      {name}
                    </Text>
                    <Text
                      sx={(theme) => ({
                        color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
                      })}
                    >
                      {username.toUpperCase()}
                    </Text>
                  </Box>
                </Box>
              </Box>
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
                    <span style={{ fontWeight: 500 }}>Total Solved:</span> {row.original.totalSolved}
                  </Text>
                  <Text>
                    <span style={{ fontWeight: 500 }}>Solve Time:</span> {row.original.totalSolveTime}
                  </Text>
                  <Text>
                    <span style={{ fontWeight: 500 }}>Average Difficulty:</span> {row.original.averageDifficulty}
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
