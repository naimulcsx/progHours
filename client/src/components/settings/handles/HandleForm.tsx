import * as Yup from "yup"
import { createOJHandle, updateOJHandle } from "~/api/handle"
import { useMutation, useQueryClient } from "react-query"
import showToast from "~/utils/showToast"
import { useForm, yupResolver } from "@mantine/form"
import { Button, Paper, Select, Stack, TextInput } from "@mantine/core"

// schema validation
const handleSchema = Yup.object().shape({
  handle: Yup.string().trim().required("Handle is required"),
  onlineJudge: Yup.string().trim().required("Online Judge is required"),
})

const HandleForm = ({ setIsOpen, isCreate, handle, onlineJudge }: any) => {
  const client = useQueryClient()

  const mutation = useMutation(isCreate ? createOJHandle : updateOJHandle, {
    onSuccess: () => {
      client.invalidateQueries("handles")
      isCreate ? showToast("success", "new handle added") : showToast("success", "handle updated")

      setIsOpen(false)
    },
    onError: (err: any) => {
      showToast("error", err.response.data.message)
      setIsOpen(false)
    },
  })

  const form = useForm({
    initialValues: {
      handle: handle || null,
      onlineJudge: onlineJudge?.name || "Codeforces",
    },
    validate: yupResolver(handleSchema),
  })

  const handleSubmit = form.onSubmit(async (values: HandleState) => {
    const judge: OJ = {
      Codeforces: 1,
      CodeChef: 2,
      Toph: 5,
      LightOJ: 8,
    }
    const data = {
      handle: values.handle,
      onlineJudgeId: judge[values.onlineJudge],
    }
    mutation.mutateAsync(data)
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label="Handle" {...form.getInputProps("handle")} />

        <Select
          label="Select Online Judge"
          placeholder="Select"
          {...form.getInputProps("onlineJudge")}
          data={[
            {
              value: "Codeforces",
              label: "Codeforces",
            },
            {
              value: "CodeChef",
              label: "CodeChef",
            },
            {
              value: "Toph",
              label: "Toph",
            },
            {
              value: "LightOJ",
              label: "LightOJ",
            },
          ]}
        />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  )
}

export default HandleForm

interface OJ {
  Codeforces: number
  CodeChef: number
  Toph: number
  LightOJ: number
}

interface HandleState {
  handle: string
  onlineJudge: "Codeforces" | "CodeChef" | "Toph" | "LightOJ"
}
