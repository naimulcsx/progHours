import { deleteGroup } from "~/api/groups"
import { Button, Group, Modal, Text, Title } from "@mantine/core"
import { useMutation, useQueryClient } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import useUser from "~/hooks/useUser"
import showToast from "~/utils/showToast"

export const DeleteGroupModal = ({ isOpen, setIsOpen, name, hashtag, id }: any) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useUser()

  const { pathname } = useLocation()

  const { mutate } = useMutation(deleteGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries("groups")
      // toast({ status: "success", title: "Group deleted!" })
      showToast("success", "Group deleted!")

      if (!pathname.includes("/admin/groups")) {
        navigate("/groups")
      }
    },
  })

  return (
    <Modal
      lockScroll={false}
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      title={<Title order={4}>Delete group: {name}</Title>}
    >
      <Text>Are you sure you want to delete this group ?</Text>
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
