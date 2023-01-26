import { Anchor, Box, useMantineTheme } from "@mantine/core"
import { IconCheck } from "@tabler/icons"
import axios from "axios"
import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom"
import { DataGrid } from "../datagrid"

export default function ListProgress() {
  const theme = useMantineTheme()
  const { listId } = useParams()

  const progressQuery = useQuery(`list/${listId}/progress`, () =>
    axios.get(`/api/lists/${listId}/progress`).then((res) => res.data)
  )

  const members = progressQuery.data?.result
    ? Object.keys(progressQuery.data?.result)?.map((key) => ({
        username: key,
      }))
    : []

  const problems = progressQuery.data?.problems || []

  const columns = problems.map((pid: string, idx: number) => {
    return {
      header: pid,
      size: 80,
      cell: (cell: any) => {
        const uid = members[cell.row.index].username
        if (progressQuery.data?.result[uid].includes(pid)) {
          return (
            <Box
              sx={{
                width: 40,
                height: 28,
                background:
                  theme.colorScheme === "dark" ? theme.colors.green[7] : theme.colors.green[5],
                borderRadius: theme.radius.md,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconCheck color="white" size={16} />
            </Box>
          )
        }
        return null
      },
    }
  })

  return (
    <Box
      sx={{
        marginLeft: -16,
        marginRight: -16,
      }}
    >
      <DataGrid
        bordered
        horizontalSpacing="xl"
        id="progress-table"
        withPagination
        pageSizes={["10", "25", "50", "100"]}
        initialState={{ pagination: { pageSize: 10 } }}
        data={progressQuery.data?.result ? members : []}
        columns={[
          {
            header: "Student Id",
            accessorKey: "username",
            cell: (cell: any) => {
              const username = cell.getValue() as string
              return (
                <Anchor
                  component={Link}
                  to={`/${username.toUpperCase()}`}
                  sx={{
                    fontWeight: 500,
                    color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[9],
                  }}
                >
                  {username.toUpperCase()}
                </Anchor>
              )
            },
          },
          ...columns,
        ]}
      />
    </Box>
  )
}
