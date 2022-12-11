import "regenerator-runtime/runtime"
import { useState } from "react"
import type { User } from "~/contexts/UserContext"
import { DataGrid } from "~/components/datagrid"
import { Group, Box, Text, Button, Anchor, Select } from "@mantine/core"
import Avatar from "~/components/Avatar"
import Action from "./Action"

export default function GroupManagementTable({ groups }: { groups: any }) {
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
          data={groups || []}
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
              accessorKey: "group.name",
              header: "Name",
              size: 300,
              cell: (cell) => {
                const name = cell.getValue() as string
                return <Text>{name}</Text>
              },
            },
            {
              accessorKey: "group.hashtag",
              header: "Slug",
              cell: (cell) => (cell.getValue() as string).toUpperCase(),
            },

            {
              header: "Admin",
              cell: (cell: any) => {
                const admin = cell?.row.original?.group?.users.filter((item: any) => item.role === "ADMIN")[0]
                return <Text>{admin?.user?.name}</Text>
              },
            },

            {
              header: "Members",
              cell: (cell: any) =>
                cell?.row.original?.group?.users.filter((item: any) => item.role === "MEMBER").length,
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
