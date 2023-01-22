import { deleteGroup } from "~/api/groups"
import { Button, Group, Modal, Text, Title } from "@mantine/core"
import { useMutation, useQueryClient } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import showToast from "~/utils/showToast"
import { Dispatch, SetStateAction } from "react"

export interface GroupDeleteModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  group: any
}

export default function GroupDeleteModal({ open, setOpen, group }: GroupDeleteModalProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { pathname } = useLocation()
  const { mutate } = useMutation(deleteGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries("groups")
      showToast("success", "Group deleted!")
      if (!pathname.includes("/admin/groups")) {
        navigate("/groups")
      }
    },
  })
  return (
    <Modal
      lockScroll={false}
      opened={open}
      onClose={() => setOpen(false)}
      title={<Title order={4}>Delete group: {group.name}</Title>}
    >
      <Text>Are you sure you want to delete this group ?</Text>
      <Group sx={{ justifyContent: "flex-end" }} mt="sm">
        <Button variant="white" color="dark" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          color="red"
          onClick={() => {
            mutate(group.id)
            setOpen(false)
          }}
        >
          Delete
        </Button>
      </Group>
    </Modal>
  )
}
