import { DataGrid } from "~/components/datagrid"
import { Anchor, Box, Group as MantineGroup, Text, ThemeIcon, Title } from "@mantine/core"
import Action from "./Action"
import type Group from "~/types/Group"
import Avatar from "~/components/Avatar"
import { IconFriends } from "@tabler/icons"
import { Link, useNavigate } from "react-router-dom"
import { useColorScheme } from "@mantine/hooks"

export default function GroupManagementTable({ groups }: { groups: Group[] }) {
  const navigate = useNavigate()
  const theme = useColorScheme()

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
                const members = cell.row.original.users.length
                return (
                  <Anchor
                    component={Link}
                    to={`/groups/${cell.row.original.slug}`}
                    color="dark"
                    sx={{ "&:hover": { textDecoration: "none" } }}
                  >
                    <MantineGroup spacing="xs" sx={{ cursor: "pointer" }}>
                      <ThemeIcon size="lg" radius="xl" variant="filled" color="blue">
                        <IconFriends size={16} stroke={2} />
                      </ThemeIcon>
                      <Box>
                        <Text
                          sx={(theme) => ({
                            fontWeight: 600,
                            color: theme.colorScheme === "dark" ? "white" : theme.colors.gray[8],
                          })}
                        >
                          {name}
                        </Text>
                        <Text color="dimmed">{members} Members</Text>
                      </Box>
                    </MantineGroup>
                  </Anchor>
                )
              },
            },

            {
              header: "Admin",
              size: 220,
              cell: (cell) => {
                const admin = cell.row.original.users.filter((item) => item.role === "ADMIN")[0]
                return (
                  <MantineGroup
                    spacing="xs"
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/${admin.user.username}`)}
                  >
                    <Avatar name={admin.user.name} />
                    <div>
                      <Text>{admin.user.name}</Text>
                    </div>
                  </MantineGroup>
                )
              },
            },

            // {
            //   header: "Members",
            //   cell: (cell) => cell.row.original.users.filter((item) => item.role === "MEMBER").length,
            // },
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
