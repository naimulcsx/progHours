import { Box, Button, Group, Paper, Text, Title, useMantineTheme } from "@mantine/core"
import { IconPlus } from "@tabler/icons"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ListCreateModal from "~/components/molecules/list-create-modal/ListCreateModal"

interface GroupProblemListsProps {
  groupId: number
  problemLists: any[]
}

export default function GroupProblemLists({ groupId, problemLists }: GroupProblemListsProps) {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const { slug } = useParams()
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ maxWidth: "1024px", margin: "0 auto" }}>
      <ListCreateModal open={open} setOpen={setOpen} groupId={groupId} />

      <Group position="apart" mb="lg">
        <Title order={3}>Problem lists</Title>
        <Box>
          <Button size="xs" leftIcon={<IconPlus size={14} />} onClick={() => setOpen(true)}>
            Create list
          </Button>
        </Box>
      </Group>

      <Paper
        sx={(theme) => ({
          borderRadius: theme.radius.md,
          overflow: "clip",
        })}
      >
        {problemLists.map((list, idx) => {
          return (
            <Box
              key={list.id}
              py="md"
              px="xl"
              sx={{
                borderTop: idx > 0 ? "1px solid" : 0,
                borderColor:
                  theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[3],
                cursor: "pointer",
                "&:hover": {
                  background: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
                },
              }}
              onClick={() => navigate(`/lists/${list.id}`)}
            >
              <Group position="apart">
                <Text sx={{ fontWeight: 500 }}>{list.name}</Text>
                <Text>0 problems</Text>
              </Group>
            </Box>
          )
        })}
      </Paper>
    </Box>
  )
}
