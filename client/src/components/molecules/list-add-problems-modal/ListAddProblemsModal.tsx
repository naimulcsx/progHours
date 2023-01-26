import { Button, Group, Modal, Textarea, TextInput, Title } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { useMutation, useQueryClient } from "react-query"
import * as Yup from "yup"

import showToast from "~/utils/showToast"
import { Dispatch, SetStateAction, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

// schema validation
const listSchema = Yup.object().shape({
  links: Yup.string().trim(),
})

// modal for creating groups
export default function ListAddProblemsModal({
  collectionId,
  open,
  setOpen,
  problems,
}: ListAddProblemsModalProps) {
  const queryClient = useQueryClient()
  const { listId } = useParams()

  const { mutate, isLoading } = useMutation(
    (data: { links: string }) =>
      axios
        .post(`/api/lists/${listId}/collections/${collectionId}`, {
          ...data,
          collectionId,
        })
        .then((res) => res.data),
    {
      onSuccess: (res) => {
        setOpen(false)
        queryClient.invalidateQueries(`lists/${listId}`)
        showToast("success", res.message)
      },
      onError: (err) => {},
    }
  )

  const form = useForm({
    initialValues: {
      links: "",
    },
    validate: yupResolver(listSchema),
  })

  useEffect(() => {
    form.setFieldValue("links", problems.join("\n"))
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
      </form>
    </Modal>
  )
}

export interface ListAddProblemsModalProps {
  collectionId: number
  open: boolean
  problems: string[]
  setOpen: Dispatch<SetStateAction<boolean>>
}
