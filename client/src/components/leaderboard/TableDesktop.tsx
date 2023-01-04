import { Box, Text } from "@mantine/core"
import { Link } from "react-router-dom"

import { DataGrid, numberFilterFn, stringFilterFn } from "~/components/datagrid"
import Avatar from "~/components/Avatar"

const LeaderboardTable = ({ data }: any) => {
  return (
    <DataGrid
      sx={(theme) => ({
        background: "white",
        boxShadow: theme.shadows.xs,
      })}
      data={data}
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
          enableGlobalFilter: true,
        },
        {
          accessorKey: "user.name",
          header: "Name",
          size: 300,
          filterFn: stringFilterFn,
          cell: ({ cell }) => {
            const { name, username } = cell.row.original.user
            return (
              <Box
                component={Link}
                to={`/${username.toUpperCase()}`}
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
          accessorKey: "user.batch",
          header: "Batch",
          cell: ({ cell }) => {
            const { department, batch } = cell.row.original.user
            return department && batch ? `${department} ${batch}` : "—"
          },
          filterFn: stringFilterFn,
          size: 100,
        },
        {
          accessorKey: "totalSolved",
          header: "Solved",
          filterFn: numberFilterFn,
          size: 100,
        },
        {
          accessorKey: "totalSolveTime",
          header: "Solve Time",
          filterFn: numberFilterFn,
          cell: ({ cell }) => {
            const { totalSolveTime } = cell.row.original
            return `${Math.floor(totalSolveTime / 60)}h ${Math.floor(totalSolveTime % 60)}m`
          },
        },
        {
          accessorKey: "averageDifficulty",
          header: "Avg. Difficulty",
          filterFn: numberFilterFn,
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
