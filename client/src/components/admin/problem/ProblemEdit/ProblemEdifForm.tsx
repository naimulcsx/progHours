import { useForm } from "@mantine/form"
import { Box, Button, Paper, Stack, TextInput, Title, MultiSelect } from "@mantine/core"
import { useEffect } from "react"

export default function ProblemEditForm({ prob, tags }) {
  useEffect(() => {
    console.log(prob, tags)
  }, [prob, tags])
  const form = useForm({
    initialValues: {
      name: prob?.name || "",
      pid: prob?.pid || "",
      difficulty: prob?.difficulty || "",
      onlineJudgeId: prob?.onlineJudgeId || "",
      tags: prob?.tagList || [],
    },
  })

  const handleSubmit = form.onSubmit((values) => {})
  const data = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
    { value: "riot", label: "Riot" },
    { value: "next", label: "Next.js" },
    { value: "blitz", label: "Blitz.js" },
  ]
  return (
    <Paper
      mb={10}
      p={24}
      sx={(theme) => ({
        borderRadius: theme.radius.md,
      })}
    >
      <Title order={4} mb="md">
        Your Profile
      </Title>
      {prob && (
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput label="Name" {...form.getInputProps("name")} />
            <TextInput label="Problem Id" disabled {...form.getInputProps("pid")} />
            <TextInput label="Difficulty" {...form.getInputProps("difficulty")} />
            <TextInput label="Online Judge ID" {...form.getInputProps("onlineJudgeId")} />
            <MultiSelect
              data={tags}
              label="Tags"
              placeholder="Problem Tags"
              searchable
              {...form.getInputProps("tags")}
            ></MultiSelect>
            <Box>
              <Button type="submit">Update</Button>
            </Box>
          </Stack>
        </form>
      )}
    </Paper>
  )
}
