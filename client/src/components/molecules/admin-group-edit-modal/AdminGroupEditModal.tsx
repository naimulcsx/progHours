import * as Yup from "yup"
import { useMutation, useQueryClient } from "react-query"
import { useForm, yupResolver } from "@mantine/form"
import showToast from "~/utils/showToast"
import { Button, Modal, Stack, TextInput, Title } from "@mantine/core"
import { editGroup } from "~/api/groups"
import type { Dispatch, SetStateAction } from "react"

// schema validation
const groupSchema = Yup.object().shape({
  name: Yup.string().trim().required("Group name is required"),
  slug: Yup.string().trim().required("Slug is required"),
})

export interface AdminGroupEditModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  group: any
}

export default function AdminGroupEditModal({ group, open, setOpen }: AdminGroupEditModalProps) {
  const client = useQueryClient()
  const mutation = useMutation((values: any) => editGroup(group.id, values), {
    onSuccess() {
      client.invalidateQueries(`groups`)
      setOpen(false)
      showToast("success", "Group updated!")
    },
  })
  const form = useForm({
    initialValues: {
      name: group.name || "",
      slug: group.slug || "",
    },
    validate: yupResolver(groupSchema),
  })
  const handleSubmit = form.onSubmit(async (values: any) => {
    mutation.mutateAsync(values)
  })
  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title={<Title order={4}>Edit group: {group.name}</Title>}
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput withAsterisk label="Group Name" type="text" {...form.getInputProps("name")} />
          <TextInput withAsterisk label="Group Slug" type="text" {...form.getInputProps("slug")} />
          <Button type="submit" sx={{ alignSelf: "start" }}>
            Save
          </Button>
        </Stack>
      </form>
    </Modal>
  )
}
