import { DataGrid } from "~/components/datagrid"
import { Box, Text } from "@mantine/core"
import Action from "./Action"
import type Group from "~/types/Group"

export default function GroupManagementTable({ groups }: { groups: Group[] }) {
  return (
    <>
      <Box sx={{ marginLeft: -16, marginRight: -16 }}>
        <DataGrid
          tableTitle="Groups"
          withGlobalFilter
          sx={(theme) => ({
            background: "white",
            boxShadow: theme.shadows.xs,
          })}
          data={groups}
          withPagination
          horizontalSpacing="md"
          pageSizes={["25", "50", "100"]}
          initialState={{ pagination: { pageSize: 25 } }}
          columns={[
            {
              accessorKey: "id",
              header: "Id",
              size: 30,
            },
            {
              accessorKey: "name",
              header: "Name",
              size: 300,
              cell: (cell) => {
                const name = cell.getValue() as string
                return <Text>{name}</Text>
              },
            },
            {
              accessorKey: "hashtag",
              header: "Slug",
              cell: (cell) => cell.getValue() as string,
            },

            {
              header: "Admin",
              cell: (cell) => {
                const admin = cell.row.original.users.filter((item) => item.role === "ADMIN")[0]
                return <Text>{admin.user.name}</Text>
              },
            },

            {
              header: "Members",
              cell: (cell) => cell.row.original.users.filter((item) => item.role === "MEMBER").length,
            },

            {
              header: "Action",
              cell: Action,
            },
          ]}
        />
      </Box>
    </>
  )
}
