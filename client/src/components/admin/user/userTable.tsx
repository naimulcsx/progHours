import type { User } from "~/contexts/UserContext"
import { DataGrid } from "~/components/datagrid"
import { Group, Box, Text } from "@mantine/core"
import Avatar from "~/components/Avatar"
import Action from "./Actions"
import { useNavigate } from "react-router-dom"

export default function UserManagementTable({ users }: { users: User[] }) {
  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ marginLeft: -16, marginRight: -16 }}>
        <DataGrid
          tableTitle="Users"
          withGlobalFilter
          sx={(theme) => ({
            background: "white",
            boxShadow: theme.shadows.xs,
          })}
          data={users || []}
          withPagination
          horizontalSpacing="xl"
          pageSizes={["25", "50", "100"]}
          initialState={{ pagination: { pageSize: 25 } }}
          columns={[
            {
              accessorKey: "id",
              header: "Id",
              size: 30,
            },
            {
              header: "Name",
              size: 300,
              accessorFn: (row) => {
                return row.name + " " + row.username
              },
              cell: (cell) => {
                return (
                  <Group sx={{ cursor: "pointer" }} onClick={() => navigate(`/${cell.row.original.username}`)}>
                    <Avatar name={cell.row.original.name} />
                    <Box>
                      <Text sx={{ fontWeight: 500 }}>{cell.row.original.name}</Text>
                      <Text color="dimmed">{cell.row.original.username.toUpperCase()}</Text>
                    </Box>
                  </Group>
                )
              },
            },
            {
              accessorKey: "email",
              header: "Email",
            },

            {
              accessorKey: "mobile",
              header: "Mobile",
              cell: (cell) => (cell.getValue() ? (cell.getValue() as string) : "—"),
            },
            // {
            //   accessorKey: "cgpa",
            //   header: "CGPA",
            //   cell: (cell) => (cell.getValue() ? (cell.getValue() as string) : "—"),
            // },
            {
              accessorKey: "role",
              header: "Role",
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
