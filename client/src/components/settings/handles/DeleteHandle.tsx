import { deleteHandle } from "~/api/handle"
import PopupBuilder from "~/components/PopupBuilder"
import showToast from "~/utils/showToast"
import { TrashIcon } from "@heroicons/react/outline"
import { ActionIcon, Box, Button, Group, Text } from "@mantine/core"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"

const DeleteHandle = ({ title, id }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  const client = useQueryClient()
  const { mutate } = useMutation(deleteHandle, {
    onSuccess() {
      client.invalidateQueries("handles")
      showToast("success", "Handle deleted")

      setIsOpen(false)
    },
    onError(err: any) {
      showToast("error", err.response.data.message)
      setIsOpen(false)
    },
  })

  return (
    <Box>
      <ActionIcon
        variant="transparent"
        color="red"
        onClick={() => setIsOpen(true)}
      >
        <TrashIcon width={20} height={20} />
      </ActionIcon>

      <PopupBuilder
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Delete ${title}`}
      >
        <Text>Are you sure you want to delete ?</Text>

        <Group mt={20} sx={{ justifyContent: "flex-end" }}>
          <Button variant="white" color="dark" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={() => {
              mutate(id)
              setIsOpen(false)
            }}
          >
            Delete
          </Button>
        </Group>
      </PopupBuilder>
    </Box>
  )
}

export default DeleteHandle
