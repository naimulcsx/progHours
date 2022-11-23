import { deleteGroup } from "~/api/groups"
import { Button, Group, Modal, Text, Title } from "@mantine/core"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"

export const DeleteGroupModal = ({
  isOpen,
  setIsOpen,
  name,
  hashtag,
  id,
}: any) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(deleteGroup, {
    onSuccess: () => {
      // toast({ status: "success", title: "Group deleted!" })
      queryClient.invalidateQueries("groups")
      navigate("/groups")
    },
  })

  return (
    <Modal
      lockScroll={false}
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      title={<Title order={4}>Delete group: {name}</Title>}
    >
      <Text>
        Are you sure you want to delete:{" "}
        <Text component="span">#{hashtag}</Text>?
      </Text>
      <Group sx={{ justifyContent: "flex-end" }} mt="sm">
        <Button variant="light" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button
          color="red"
          onClick={() => {
            mutate(id)
            setIsOpen(false)
          }}
        >
          Delete
        </Button>
      </Group>
    </Modal>
  )
}
