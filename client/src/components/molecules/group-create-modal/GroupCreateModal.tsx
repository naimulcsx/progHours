import { Button, Group, Modal, TextInput, Title } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { useMutation, useQueryClient } from "react-query"
import * as Yup from "yup"

import showToast from "~/utils/showToast"
import { createGroup } from "~/api/groups"
import { Dispatch, SetStateAction } from "react"

// schema validation
const groupSchema = Yup.object().shape({
  name: Yup.string().trim().required("Group Name is required"),
  slug: Yup.string().trim().required("Group tag is required"),
})

// modal for creating groups
export default function GroupCreateModal({ open, setOpen }: GroupCreateModalProps) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(createGroup, {
    onSuccess: (res) => {
      setOpen(false)
      queryClient.invalidateQueries("groups")
      showToast("success", res.message)
    },
  })

  const form = useForm({
    initialValues: {
      name: "",
      slug: "",
    },
    validate: yupResolver(groupSchema),
  })

  return (
    <Modal
      lockScroll={false}
      opened={open}
      onClose={() => setOpen(false)}
      title={<Title order={4}>Create group</Title>}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          mutate(values)
          form.reset()
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
          {...form.getInputProps("slug")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  )
}

export interface GroupCreateModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
