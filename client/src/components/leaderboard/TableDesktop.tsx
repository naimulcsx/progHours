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
      verticalSpacing="sm"
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
                        maxWidth: 240,
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
