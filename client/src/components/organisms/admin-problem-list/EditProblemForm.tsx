import { useForm, yupResolver } from "@mantine/form"
import {
  Box,
  Button,
  Paper,
  Stack,
  TextInput,
  Title,
  MultiSelect,
  useMantineTheme,
} from "@mantine/core"
import { useState } from "react"
import { Problem } from "~/types/Problem"
import { ProblemTag } from "~/types/ProblemTag"
import { useMutation, useQueryClient } from "react-query"
import { updateProblem } from "~/api/problems"
import showToast from "~/utils/showToast"
import { AxiosError } from "axios"
import * as Yup from "yup"
import { Tag } from "~/types/Tag"

interface EditProblem {
  problem: Problem
  tags: Tag[]
  pid: string
}

const problemSchema = Yup.object().shape({
  name: Yup.string().trim().required("required field"),
  difficulty: Yup.number(),
  tags: Yup.array().required("required field"),
})

const EditProblemForm = ({ problem, tags, pid }: EditProblem) => {
  const [value, setValue] = useState<string[]>()
  const theme = useMantineTheme()

  // map problem tags
  const problemTags = problem.tags.map((item) => item.tag.name)

  const form = useForm({
    validate: yupResolver(problemSchema),

    initialValues: {
      name: problem.name || "",
      pid: problem.pid,
      difficulty: problem.difficulty || 0,
      onlineJudge: problem.onlineJudge.name,
      tags: problemTags,
    },
  })

  const handleSubmit = form.onSubmit(async (values) => {
    const data: any = {
      ...values,
      difficulty: Number(values.difficulty),
    }

    await mutateAsync(data)
  })

  const client = useQueryClient()
  const { mutateAsync } = useMutation((data) => updateProblem(pid, data), {
    onSuccess() {
      client.invalidateQueries(`problems/${pid}`)
      client.invalidateQueries("tags")

      showToast("success", "Problem updated")
    },
    onError(err: AxiosError) {
      if (err.response) showToast("error", err.response.data.message)
    },
  })

  return (
    <Paper
      mb={10}
      p={24}
      sx={(theme) => ({
        borderRadius: theme.radius.md,
      })}
    >
      <Title order={4} mb="md">
        Edit{" "}
        <Box component="span" sx={{ color: theme.colors.blue[6] }}>
          "{problem.name}"
        </Box>
      </Title>
      {problem && (
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput label="Name" {...form.getInputProps("name")} />
            <TextInput label="Problem Id" disabled {...form.getInputProps("pid")} />
            <TextInput type="number" label="Difficulty" {...form.getInputProps("difficulty")} />
            <TextInput label="Online Judge" disabled {...form.getInputProps("onlineJudge")} />

            <MultiSelect
              label="Tags"
              placeholder="Pick all that you like"
              searchable
              clearSearchOnChange
              data={tags.map((item) => item.name)}
              value={value}
              defaultValue={problemTags}
              onChange={(value) => {
                form.setFieldValue("tags", value)
                setValue(value)
              }}
            />

            <Box>
              <Button type="submit">Update</Button>
            </Box>
          </Stack>
        </form>
      )}
    </Paper>
  )
}

export default EditProblemForm
