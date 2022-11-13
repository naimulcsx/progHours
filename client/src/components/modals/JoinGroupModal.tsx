import { createGroup, joinGroup } from "~/api/groups"
import { toast, useToast } from "@chakra-ui/react"
import FormBuilder from "../FormBuilder"
import PopupBuilder from "../PopupBuilder"
import * as yup from "yup"
import { DEFAULT_TOAST_OPTIONS } from "~/configs/toast-config"
import { useMutation, useQuery, useQueryClient } from "react-query"
import showToast from "~/utils/showToast"
import { useForm, yupResolver } from "@mantine/form"
import * as Yup from "yup"
import { Button, Group, TextInput } from "@mantine/core"

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
    <PopupBuilder isOpen={isOpen} setIsOpen={setIsOpen} title="Join a Group">
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
