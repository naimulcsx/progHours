import { Anchor, Box, Button, Group, Modal, Title } from "@mantine/core"
import { useState } from "react"
import { DeleteGroupModal } from "~/components/modals/DeleteGroupModal"
import PopupBuilder from "~/components/PopupBuilder"
import EditGroup from "./EditGroup"
// import EditUserForm from "./EditUserForm"

const Action = (cell: any) => {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const group = cell?.row.original?.group

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
        <EditGroup data={cell.row.original} setIsOpen={setEditOpen} />
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
