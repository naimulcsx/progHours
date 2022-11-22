import { Anchor, Box, Button } from "@mantine/core"
import { useState } from "react"
import PopupBuilder from "~/components/PopupBuilder"
import EditUserForm from "./EditUserForm"

const Action = (cell: any) => {
  const [opened, setOpened] = useState(false)

  return (
    <Box>
      {/*edit button  */}
      <Anchor onClick={() => setOpened(true)}>Edit</Anchor>

      <PopupBuilder title={`Edit account of ${cell.row.original.name}`} isOpen={opened} setIsOpen={setOpened}>
        <EditUserForm data={cell.row.original} setIsOpen={setOpened} />
      </PopupBuilder>
    </Box>
  )
}

export default Action
