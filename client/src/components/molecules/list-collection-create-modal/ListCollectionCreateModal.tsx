import { Button, Group, Modal, TextInput, Title } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { useMutation, useQueryClient } from "react-query"
import * as Yup from "yup"

import showToast from "~/utils/showToast"
import { Dispatch, SetStateAction } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

// schema validation
const collectionSchema = Yup.object().shape({
  name: Yup.string().trim().required("Collection is required"),
})

// modal for creating groups
export default function ListCollectionCreateModal({ open, setOpen }: ListCollectionCreateModal) {
  const queryClient = useQueryClient()
  const { listId } = useParams()

  const { mutate } = useMutation(
    (data: { name: string }) =>
      axios
        .post(`/api/lists/${listId}/collections`, {
          ...data,
          listId: Number(listId),
        })
        .then((res) => res.data),
    {
      onSuccess: (res) => {
        setOpen(false)
        queryClient.invalidateQueries(`lists/${listId}`)
        showToast("success", res.message)
      },
      onError: (err) => {
        console.log(err)
      },
    }
  )

  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: yupResolver(collectionSchema),
  })

  return (
    <Modal
      lockScroll={false}
      opened={open}
      onClose={() => setOpen(false)}
      title={<Title order={4}>Create collection</Title>}
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
          placeholder="eg. Prime Factorization"
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  )
}

export interface ListCollectionCreateModal {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
