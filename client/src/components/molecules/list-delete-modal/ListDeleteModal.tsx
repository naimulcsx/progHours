import { Button, Group, Modal, Text, Title } from "@mantine/core"
import { Dispatch, SetStateAction } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { deleteList } from "~/api/List"
import { List } from "~/types/List"
import showToast from "~/utils/showToast"

const ListDeleteModal = ({ isOpen, setIsOpen, list }: ListDeleteModalProps) => {
  const client = useQueryClient()
  const navigate = useNavigate()

  console.log(list)

  // list mutation
  const { mutateAsync } = useMutation(deleteList, {
    onSuccess: () => {
      client.invalidateQueries("lists")
      showToast("success", "List deleted!")

      navigate(`/groups/${list.group.slug}`)
    },
    onError: (err: any) => {
      showToast("error", err.response.data.message)
    },
  })

  return (
    <Modal
      lockScroll={false}
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      title={<Title order={4}>Delete group: {list.name}</Title>}
    >
      <Text>Are you sure you want to delete this list ?</Text>
      <Group sx={{ justifyContent: "flex-end" }} mt="sm">
        <Button variant="white" color="dark" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button
          color="red"
          onClick={async () => {
            await mutateAsync(list.id)
            setIsOpen(false)
          }}
        >
          Delete
        </Button>
      </Group>
    </Modal>
  )
}

export default ListDeleteModal

interface ListDeleteModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  list: List
}
