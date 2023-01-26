import { Alert, Box, Button, Paper, Stack, TextInput } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { IconAlertCircle } from "@tabler/icons"
import { AxiosError } from "axios"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { updateList } from "~/api/List"
import { List } from "~/types/List"
import showToast from "~/utils/showToast"
import * as Yup from "yup"
import { useState } from "react"
import ListDeleteModal from "../list-delete-modal/ListDeleteModal"

const ListUpdateForm = ({ list }: { list: List }) => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  // list mutation
  const mutation = useMutation((values: any) => updateList(list.id, values), {
    onSuccess(res) {
      queryClient.invalidateQueries(`lists/${list.id}`)
      showToast("success", "List updated!")
    },
    onError: (err: any) => {
      showToast("error", err.response.data.message)
      console.log(err.response)
    },
  })

  const form = useForm({
    validate: yupResolver(
      Yup.object().shape({
        name: Yup.string(),
      })
    ),

    initialValues: {
      name: list.name || "",
    },
  })

  const handleSubmit = form.onSubmit(async (values) => {
    await mutation.mutateAsync(values)
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
          <TextInput
            label="List Name"
            placeholder="Ex: Number theory"
            withAsterisk
            {...form.getInputProps("name")}
          />

          <Button size="sm" type="submit" sx={{ alignSelf: "start" }}>
            Save
          </Button>
        </Stack>
      </form>

      <Stack mt="md">
        <Alert icon={<IconAlertCircle size={16} />} title="Warning!" color="red">
          This will delete your problem list permanently
        </Alert>
        <Box>
          <Button size="sm" color="red" onClick={() => setIsOpen(true)}>
            Delete
          </Button>
        </Box>
      </Stack>

      {/* delete list popup  */}
      <ListDeleteModal isOpen={isOpen} setIsOpen={setIsOpen} list={list} />
    </Paper>
  )
}

export default ListUpdateForm
