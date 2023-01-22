import { joinGroup } from "~/api/groups"
import { useMutation, useQueryClient } from "react-query"
import showToast from "~/utils/showToast"
import { useForm, yupResolver } from "@mantine/form"
import * as Yup from "yup"
import { Button, Group, Modal, TextInput, Title } from "@mantine/core"
import { Dispatch, SetStateAction } from "react"

// schema validation
const groupSchema = Yup.object().shape({
  accessCode: Yup.string().trim().required("Access Code is required"),
})

export default function GroupJoinModal({ open, setOpen }: GroupJoinModalProps) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(joinGroup, {
    onSuccess: () => {
      setOpen(false)
      queryClient.invalidateQueries("groups")
      showToast("success", "Group joined")
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data?.message || "Something bad happened!"
      showToast("error", errorMessage)
    },
  })

  const form = useForm({
    initialValues: {
      accessCode: "",
    },
    validate: yupResolver(groupSchema),
  })

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title={<Title order={4}>Join a Group</Title>}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          mutate(values)
        })}
      >
        <TextInput withAsterisk label="Access Code" {...form.getInputProps("accessCode")} />
        <Group position="right" mt="md">
          <Button type="submit">Join</Button>
        </Group>
      </form>
    </Modal>
  )
}

interface GroupJoinModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
