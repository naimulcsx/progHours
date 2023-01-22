import { removeMember } from "~/api/groups"
import { Button, Group, Modal, Text, Title } from "@mantine/core"
import { useMutation, useQueryClient } from "react-query"
import showToast from "~/utils/showToast"

export default function GroupRemoveMemberModal({ isOpen, setIsOpen, data }: any) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(removeMember, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(`groups/${data?.group.slug}`)
      showToast("success", "Member removed!")
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data?.message || "Something went wrong!"
      showToast("error", errorMessage)
    },
  })

  return (
    <Modal
      lockScroll={false}
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      title={<Title order={4}>Remove: {data.user.name} </Title>}
    >
      <Text>
        Are you sure you want to remove{" "}
        <Text size="md" component="span" weight="bold">
          {data.user.name}
        </Text>{" "}
        from this group?
      </Text>
      <Group sx={{ justifyContent: "flex-end" }} mt="sm">
        <Button color="dark" variant="white" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button
          color="red"
          onClick={() => {
            mutate({ userId: data.user.id, groupId: data.group.id })
            setIsOpen(false)
          }}
        >
          Remove
        </Button>
      </Group>
    </Modal>
  )
}
