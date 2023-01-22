import { Link } from "react-router-dom"
import { Box, Text } from "@mantine/core"
import { Avatar } from "~/components/atoms"
import { LeaderboardItem } from "~/types/Stats"
import { DataGrid, numberFilterFn, stringFilterFn } from "~/components/organisms/datagrid"

export default function LeaderboardDesktop({ data }: { data: LeaderboardItem[] }) {
  return (
    <DataGrid<LeaderboardItem>
      sx={(theme) => ({
        background: "white",
        boxShadow: theme.shadows.xs,
      })}
      data={data}
      withSorting
      withPagination
      withColumnFilters
      horizontalSpacing="xl"
      verticalSpacing="xs"
      pageSizes={["25", "50", "100"]}
      initialState={{ pagination: { pageSize: 25 } }}
      columns={[
        {
          header: "Rank",
          accessorKey: "rank",
          enableGlobalFilter: true,
          size: 55,
        },
        {
          header: "Name",
          accessorKey: "user.name",
          filterFn: stringFilterFn,
          size: 300,
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
                        color:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[2]
                            : theme.colors.gray[6],
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
          header: "Batch",
          accessorKey: "user.batch",
          filterFn: stringFilterFn,
          size: 100,
          cell: ({ cell }) => {
            const { department, batch } = cell.row.original.user
            return department && batch ? `${department} ${batch}` : "—"
          },
        },
        {
          header: "Solved",
          accessorKey: "totalSolved",
          filterFn: numberFilterFn,
          size: 100,
        },
        {
          header: "Solve Time",
          accessorKey: "totalSolveTime",
          filterFn: numberFilterFn,
          cell: ({ cell }) => {
            const { totalSolveTime } = cell.row.original
            return `${Math.floor(totalSolveTime / 60)}h ${Math.floor(totalSolveTime % 60)}m`
          },
        },
        {
          header: "Avg. Difficulty",
          accessorKey: "averageDifficulty",
          filterFn: numberFilterFn,
        },
        {
          header: "Score",
          accessorKey: "score",
          filterFn: numberFilterFn,
          cell: ({ row }) => row.original.score.toFixed(2),
        },
      ]}
    />
  )
}
