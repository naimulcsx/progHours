import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import PopupBuilder from "../PopupBuilder"
import { ActionIcon, Box, Button, Group, Text, Title } from "@mantine/core"
import { IconTrash } from "@tabler/icons"
import { deleteUserStudy } from "~/api/userStudies"
import showToast from "~/utils/showToast"

const DeleteStudyList = ({ item, deleteOpen, setDeleteOpen }: any) => {
  const { title, id } = item

  const client = useQueryClient()
  const { mutate } = useMutation(deleteUserStudy, {
    onSuccess() {
      client.invalidateQueries("userStudies")
      showToast("success", "Resource deleted!")
      setDeleteOpen(false)
    },
    onError(err: any) {
      showToast("error", err.response.data.message)
      setDeleteOpen(false)
    },
  })

  return (
    <>
      <PopupBuilder isOpen={deleteOpen} setIsOpen={setDeleteOpen} title={`Delete ${title}`}>
        <Text>Are you sure you want to delete ?</Text>

        <Group mt={20} sx={{ justifyContent: "flex-end" }}>
          <Button variant="white" color="dark" onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={() => {
              mutate(id)
              setDeleteOpen(false)
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
