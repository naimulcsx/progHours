import { Button, Group, Modal, Text, Title } from "@mantine/core"
import { useMutation, useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import showToast from "~/utils/showToast"
import { Dispatch, SetStateAction } from "react"
import axios from "axios"

export interface ListCollectionDeleteModalProps {
  collectionId: number
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ListCollectionDeleteModal({
  collectionId,
  open,
  setOpen,
}: ListCollectionDeleteModalProps) {
  const { listId } = useParams()
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (collectionId: number) =>
      axios.delete(`/api/lists/${listId}/collections/${collectionId}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`lists/${listId}`)
        showToast("success", "Collection deleted!")
      },
    }
  )
  return (
    <Modal
      lockScroll={false}
      opened={open}
      onClose={() => setOpen(false)}
      title={<Title order={4}>Delete collection</Title>}
    >
      <Text>Are you sure you want to delete this collection ?</Text>
      <Group sx={{ justifyContent: "flex-end" }} mt="sm">
        <Button variant="white" color="dark" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          color="red"
          onClick={() => {
            mutate(collectionId)
            setOpen(false)
          }}
        >
          Delete
        </Button>
      </Group>
    </Modal>
  )
}
