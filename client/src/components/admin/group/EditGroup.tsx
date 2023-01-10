import * as Yup from "yup"
import { useMutation, useQueryClient } from "react-query"
import { useForm, yupResolver } from "@mantine/form"
import showToast from "~/utils/showToast"
import { Button, Stack, TextInput } from "@mantine/core"
import { editGroup } from "~/api/groups"
import Groups from "~/types/Group"
import { Dispatch, SetStateAction } from "react"

// schema validation
const groupSchema = Yup.object().shape({
  name: Yup.string().trim().required("Group name is required"),
  hashtag: Yup.string().trim().required("Slug is required"),
})

interface Props {
  group: Groups
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function EditGroup({ group, setIsOpen }: Props) {
  const client = useQueryClient()

  // mutation
  const mutation = useMutation((values: any) => editGroup(group.id, values), {
    onSuccess() {
      client.invalidateQueries(`groups`)
      setIsOpen(false)
      showToast("success", "Group updated!")
    },
  })

  const form = useForm({
    initialValues: {
      name: group.name || "",
      hashtag: group.hashtag || "",
    },

    validate: yupResolver(groupSchema),
  })

  const handleSubmit = form.onSubmit(async (values: any) => {
    mutation.mutateAsync(values)
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput withAsterisk label="Group Name" type="text" {...form.getInputProps("name")} />
        <TextInput withAsterisk label="Group Slug" type="text" {...form.getInputProps("hashtag")} />

        <Button type="submit" sx={{ alignSelf: "start" }}>
          Save
        </Button>
      </Stack>
    </form>
  )
}
