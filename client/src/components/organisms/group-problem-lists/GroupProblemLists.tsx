import { Box, Button, Group, Paper, Stack, Text, Title, useMantineTheme } from "@mantine/core"
import { IconAlertCircle, IconFolder, IconLayoutList, IconPlus } from "@tabler/icons"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ListCreateModal from "~/components/molecules/list-create-modal/ListCreateModal"
import { List } from "~/types/List"

interface GroupProblemListsProps {
  groupId: number
  problemLists: List[]
  isAdmin: boolean
}

export default function GroupProblemLists({
  isAdmin,
  groupId,
  problemLists,
}: GroupProblemListsProps) {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const { slug } = useParams()
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ maxWidth: "1024px", margin: "0 auto" }}>
      <ListCreateModal open={open} setOpen={setOpen} groupId={groupId} />

      <Group position="apart" mb="lg">
        <Title order={3}>Problem lists</Title>

        {problemLists.length > 0 && isAdmin && (
          <Box>
            <Button size="xs" leftIcon={<IconPlus size={14} />} onClick={() => setOpen(true)}>
              Create list
            </Button>
          </Box>
        )}
      </Group>

      <Paper
        sx={(theme) => ({
          borderRadius: theme.radius.md,
          overflow: "clip",
        })}
      >
        {problemLists.length === 0 ? (
          <Stack p="xl">
            <Group>
              <IconAlertCircle />
              <Text>
                {isAdmin
                  ? "Looks like you have no problem list. Consider creating a problem list and add collections."
                  : "Looks like there is no problem list available."}
              </Text>
            </Group>
            {isAdmin && (
              <Group>
                <Button size="xs" leftIcon={<IconPlus size={14} />} onClick={() => setOpen(true)}>
                  Create list
                </Button>
              </Group>
            )}
          </Stack>
        ) : (
          <>
            {problemLists.map((list, idx) => {
              const totalProblem = list.collections.reduce(
                (sum, item) => sum + item.problems.length,
                0
              )
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
                    <Group>
                      <IconLayoutList />
                      <Text sx={{ fontWeight: 500 }}>{list.name}</Text>
                    </Group>
                    <Text>
                      {totalProblem} {totalProblem > 0 ? "Problems" : "Problem"}
                    </Text>
                  </Group>
                </Box>
              )
            })}
          </>
        )}
      </Paper>
    </Box>
  )
}
