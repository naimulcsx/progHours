import { Button, Group, Modal, TextInput, Title } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { useMutation, useQueryClient } from "react-query"
import * as Yup from "yup"

import showToast from "~/utils/showToast"
import { createGroup } from "~/api/groups"

// schema validation
const groupSchema = Yup.object().shape({
  name: Yup.string().trim().required("Group Name is required"),
  hashtag: Yup.string().trim().required("Group tag is required"),
})

// modal for creating groups
export default function CreateGroupModal({ isOpen, setIsOpen }: any) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(createGroup, {
    onSuccess: (res) => {
      setIsOpen(false)
      showToast("success", res.message)
    },
  })

  const form = useForm({
    initialValues: {
      name: "",
      hashtag: "",
    },
    validate: yupResolver(groupSchema),
  })

  return (
    <Modal
      lockScroll={false}
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      title={<Title order={4}>Create group</Title>}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          mutate(values)
        })}
      >
        <TextInput
          withAsterisk
          label="Name"
          {...form.getInputProps("name")}
          placeholder="CSE 46 BM"
        />

        <TextInput
          withAsterisk
          mt="md"
          label="Slug"
          placeholder="cse_46_bm"
          {...form.getInputProps("hashtag")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  )
}
