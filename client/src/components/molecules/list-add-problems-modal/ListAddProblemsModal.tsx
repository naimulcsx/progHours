import { Button, Group, Modal, Stack, Textarea, TextInput, Title } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { useMutation, useQueryClient } from "react-query"
import * as Yup from "yup"

import showToast from "~/utils/showToast"
import { Dispatch, SetStateAction, useEffect } from "react"
import axios, { Axios, AxiosError } from "axios"
import { useParams } from "react-router-dom"
import { Collection } from "~/types/Collection"

// schema validation
const listSchema = Yup.object().shape({
  links: Yup.string().trim(),
  name: Yup.string(),
})

// modal for creating groups
export default function ListAddProblemsModal({
  collection,
  open,
  setOpen,
  problems,
}: ListAddProblemsModalProps) {
  const queryClient = useQueryClient()
  const { listId } = useParams()

  console.log(collection)

  const { mutate, isLoading } = useMutation(
    (data: { links: string }) =>
      axios
        .post(`/api/lists/${listId}/collections/${collection.id}`, {
          ...data,
          collectionId: collection.id,
        })
        .then((res) => res.data),
    {
      onSuccess: (res) => {
        setOpen(false)
        queryClient.invalidateQueries(`lists/${listId}`)
        showToast("success", res.message)
      },
      onError: (err: any) => {
        showToast("error", err.response.data.message)
      },
    }
  )

  const form = useForm({
    initialValues: {
      links: "",
      name: "",
    },
    validate: yupResolver(listSchema),
  })

  useEffect(() => {
    form.setFieldValue("links", problems.join("\n"))
    form.setFieldValue("name", collection.name)
  }, [problems])

  return (
    <Modal
      lockScroll={false}
      opened={open}
      size="lg"
      onClose={() => setOpen(false)}
      title={<Title order={4}>Add problems</Title>}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          mutate(values)
          console.log(values)
          form.reset()
        })}
      >
        <Stack>
          <TextInput label="Collection name" {...form.getInputProps("name")} />
          <Textarea
            placeholder="https://codeforces.com/contest/1742/problem/A&#10;https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/L&#10;..."
            minRows={8}
            withAsterisk
            label="Problem Links"
            description="Enter the problem links for this collection, one problem per line."
            {...form.getInputProps("links")}
            disabled={isLoading}
          />

          <Group position="right" mt="md">
            <Button type="submit" loading={isLoading}>
              Submit
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}

export interface ListAddProblemsModalProps {
  collection: any
  open: boolean
  problems: string[]
  setOpen: Dispatch<SetStateAction<boolean>>
}
