import { Anchor, Box, Button, Group, Modal, Title } from "@mantine/core"
import { useState } from "react"
import { Cell } from "react-table"
import { DeleteGroupModal } from "~/components/modals/DeleteGroupModal"
import PopupBuilder from "~/components/PopupBuilder"
import Groups from "~/types/Group"
import EditGroup from "./EditGroup"

const Action = (cell: any) => {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const group = cell?.row.original as Groups

  return (
    <Box>
      <Group>
        <Anchor onClick={() => setEditOpen(true)}>Edit</Anchor>
        <Anchor onClick={() => setDeleteOpen(true)}>Delete</Anchor>
      </Group>
      <Modal
        opened={editOpen}
        onClose={() => setEditOpen(false)}
        title={<Title order={4}>Edit Group - {group.name}</Title>}
      >
        <EditGroup group={group} setIsOpen={setEditOpen} />
      </Modal>

      <DeleteGroupModal
        id={group.id}
        name={group.name}
        hashtag={group.hashtag}
        isOpen={deleteOpen}
        setIsOpen={setDeleteOpen}
      />
    </Box>
  )
}

export default Action
