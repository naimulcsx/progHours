import { Dispatch, SetStateAction, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { Button, Group, Modal, Text, Title } from "@mantine/core"
import { deleteUserStudy } from "~/api/userStudies"
import showToast from "~/utils/showToast"

export default function StudyDeleteModal({ open, setOpen, item }: StudyDeleteModalProps) {
  const { title, id } = item

  const client = useQueryClient()
  const { mutate } = useMutation(deleteUserStudy, {
    onSuccess() {
      client.invalidateQueries("userStudies")
      showToast("success", "Resource deleted!")
      setOpen(false)
    },
    onError(err: any) {
      showToast("error", err.response.data.message)
      setOpen(false)
    },
  })

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title={<Title order={5}>{`Delete: ${title}`}</Title>}
    >
      <Text>Are you sure you want to delete this group? This action cannot be undone.</Text>
      <Group mt={20} sx={{ justifyContent: "flex-end" }}>
        <Button variant="white" color="dark" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          variant="filled"
          color="red"
          onClick={() => {
            mutate(id)
            setOpen(false)
          }}
        >
          Delete
        </Button>
      </Group>
    </Modal>
  )
}

export interface StudyDeleteModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  item: any
}
