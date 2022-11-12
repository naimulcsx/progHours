import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import PopupBuilder from "../PopupBuilder"
import { ActionIcon, Box, Button, Group, Text, Title } from "@mantine/core"
import { IconTrash } from "@tabler/icons"
import { deleteUserStudy } from "~/api/userStudies"
import showToast from "~/utils/showToast"

const DeleteStudyList = ({ item }: any) => {
  const { title, id } = item

  const [isOpen, setIsOpen] = useState(false)

  const client = useQueryClient()
  const { mutate } = useMutation(deleteUserStudy, {
    onSuccess() {
      client.invalidateQueries("studies")
      showToast("success", "study deleted")
      setIsOpen(false)
    },
    onError(err: any) {
      showToast("error", err.response.data.message)
      setIsOpen(false)
    },
  })

  return (
    <>
      <ActionIcon
        variant="transparent"
        color="red"
        onClick={() => setIsOpen(true)}
      >
        <IconTrash size={16} />
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
    </>
  )
}

export default DeleteStudyList
