import { Anchor, Box, Button, Modal, Title } from "@mantine/core"
import { useState } from "react"
import PopupBuilder from "~/components/PopupBuilder"
import EditUserForm from "./EditUserForm"

const Action = (cell: any) => {
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <Anchor onClick={() => setOpen(true)}>Edit</Anchor>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title={<Title order={4}>Edit user - {cell.row.original.name}</Title>}
      >
        <EditUserForm data={cell.row.original} setIsOpen={setOpen} />
      </Modal>
    </Box>
  )
}

export default Action
