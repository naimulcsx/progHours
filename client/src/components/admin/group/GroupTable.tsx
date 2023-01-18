import { DataGrid } from "~/components/datagrid"
import { Box, Group as MantineGroup, Text, ThemeIcon } from "@mantine/core"
import Action from "./Action"
import type Group from "~/types/Group"
import Avatar from "~/components/Avatar"
import { IconFriends } from "@tabler/icons"
import { useNavigate } from "react-router-dom"

export default function GroupManagementTable({ groups }: { groups: Group[] }) {
  const navigate = useNavigate()

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

                return (
                  <MantineGroup
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/groups/${cell.row.original.slug}`)}
                  >
                    <ThemeIcon size="lg" radius="xl" variant="light" color="blue">
                      <IconFriends size={16} stroke={2} />
                    </ThemeIcon>
                    <Text>{name}</Text>
                  </MantineGroup>
                )
              },
            },

            {
              header: "Admin",
              cell: (cell) => {
                const admin = cell.row.original.users.filter((item) => item.role === "ADMIN")[0]
                return (
                  <MantineGroup sx={{ cursor: "pointer" }} onClick={() => navigate(`/${admin.user.username}`)}>
                    <Avatar name={admin.user.name} />
                    <Text>{admin.user.name}</Text>
                  </MantineGroup>
                )
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
