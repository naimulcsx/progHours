import { useForm } from "@mantine/form"
import { Box, Button, Paper, Stack, TextInput, Title } from "@mantine/core"

export default function ProblemEditForm({ prob }) {
  const form = useForm({
    initialValues: {
      name: prob?.name || "",
      pid: prob?.pid || "",
      difficulty: prob?.difficulty || "",
      onlineJudgeId: prob?.onlineJudgeId || "",
    },
  })

  const handleSubmit = form.onSubmit((values) => {})
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
            <Box>
              <Button type="submit">Update</Button>
            </Box>
          </Stack>
        </form>
      )}
    </Paper>
  )
}
