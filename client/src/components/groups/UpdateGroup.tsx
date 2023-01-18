import { useMutation, useQueryClient } from "react-query"
import { Alert, Box, Button, Paper, Stack, TextInput } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons"
import { useForm, yupResolver } from "@mantine/form"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"

import { editGroup } from "~/api/groups"
import showToast from "~/utils/showToast"
import { DeleteGroupModal } from "../modals/DeleteGroupModal"
import { useState } from "react"

// schema validation
const updateGroupSchema = Yup.object().shape({
  name: Yup.string().trim().required("Group name is required"),
  slug: Yup.string().trim().required("Slug is required"),
})

const UpdateGroup = ({ group }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // mutation
  const mutation = useMutation((values: any) => editGroup(group.id, values), {
    onSuccess(res) {
      navigate(`/groups/${res.body.group.slug}`)
      queryClient.invalidateQueries(`groups/${group.slug}`)
      showToast("success", "Group updated!")
    },
  })

  // form
  const form = useForm({
    initialValues: {
      name: group?.name || "",
      slug: group?.slug || "",
    },
    validate: yupResolver(updateGroupSchema),
  })
  const handleSubmit = form.onSubmit((values) => {
    mutation.mutateAsync(values)
  })

  return (
    <Paper
      sx={(theme) => ({
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
      })}
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput withAsterisk label="Name" type="text" {...form.getInputProps("name")} />
          <TextInput
            withAsterisk
            description="Slug to be used in the URL of the groups. Space is not allowed."
            label="Slug"
            type="text"
            {...form.getInputProps("slug")}
          />

          <Button type="submit" sx={{ alignSelf: "start" }}>
            Save
          </Button>
        </Stack>
      </form>

      <Stack mt="md">
        <Alert icon={<IconAlertCircle size={16} />} title="Warning!" color="red">
          This will delete your group permanently.
        </Alert>
        <Box>
          <Button color="red" onClick={() => setIsOpen(true)}>
            Delete
          </Button>
        </Box>
      </Stack>

      {/* delete popup */}
      <DeleteGroupModal id={group.id} name={group.name} slug={group.slug} isOpen={isOpen} setIsOpen={setIsOpen} />
    </Paper>
  )
}

export default UpdateGroup
