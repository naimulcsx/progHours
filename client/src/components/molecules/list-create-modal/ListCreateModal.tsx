import { Button, Group, Modal, TextInput, Title } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { useMutation, useQueryClient } from "react-query"
import * as Yup from "yup"

import showToast from "~/utils/showToast"
import { Dispatch, SetStateAction } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

// schema validation
const listSchema = Yup.object().shape({
  name: Yup.string().trim().required("List Name is required"),
})

// modal for creating groups
export default function ListCreateModal({ groupId, open, setOpen }: ListCreateModalProps) {
  const queryClient = useQueryClient()
  const { slug } = useParams()

  const { mutate } = useMutation(
    (data: { name: string }) =>
      axios
        .post("/api/lists", {
          ...data,
          groupId,
        })
        .then((res) => res.data),
    {
      onSuccess: (res) => {
        setOpen(false)
        queryClient.invalidateQueries(`groups/${slug}/lists`)
        showToast("success", res.message)
      },
      onError: (err) => {},
    }
  )

  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: yupResolver(listSchema),
  })

  return (
    <Modal
      lockScroll={false}
      opened={open}
      onClose={() => setOpen(false)}
      title={<Title order={4}>Create list</Title>}
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
          placeholder="eg. Number Theory"
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  )
}

export interface ListCreateModalProps {
  groupId: number
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
