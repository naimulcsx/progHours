import { joinGroup } from "~/api/groups"
import PopupBuilder from "../PopupBuilder"
import * as yup from "yup"
import { useMutation, useQueryClient } from "react-query"
import showToast from "~/utils/showToast"
import { useForm, yupResolver } from "@mantine/form"
import * as Yup from "yup"
import { Button, Group, TextInput, Title } from "@mantine/core"

// schema validation
const groupSchema = Yup.object().shape({
  accessCode: yup.string().trim().required("Access Code is required"),
})

export const JoinGroupModal = ({ isOpen, setIsOpen }: any) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(joinGroup, {
    onSuccess: () => {
      setIsOpen(false)
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
    <PopupBuilder isOpen={isOpen} setIsOpen={setIsOpen} title={<Title order={4}>Join a Group</Title>}>
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
    </PopupBuilder>
  )
}
