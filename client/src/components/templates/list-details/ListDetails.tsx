import DashboardLayout from "../dashboard-layout/DashboardLayout"
import { motion } from "framer-motion"
import {
  Accordion,
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core"
import { Link } from "react-router-dom"
import { IconAlertCircle, IconChartBar, IconEdit, IconList } from "@tabler/icons"
import { ListCollectionCreateModal, ProblemCard } from "~/components/molecules"
import { useState } from "react"
import ListAddProblemsModal from "~/components/molecules/list-add-problems-modal/ListAddProblemsModal"

interface ListDetailsTemplateProps {
  list: any
  isLoading: boolean
}

export default function ListDetailsTemplate({ list, isLoading }: ListDetailsTemplateProps) {
  const theme = useMantineTheme()
  const [open, setOpen] = useState(false)
  const [problemModalOpen, setProblemModalOpen] = useState(false)
  const [collectionId, setCollectionId] = useState(0)
  const [problems, setProblems] = useState([])

  const items = [
    { label: "Groups", to: "/groups" },
    { label: list?.group?.name, to: `/groups/${list?.group?.slug}` },
    { label: list?.name, to: `/lists/${list?.id}` },
  ]

  return (
    <DashboardLayout>
      <ListCollectionCreateModal open={open} setOpen={setOpen} />

      <ListAddProblemsModal
        open={problemModalOpen}
        setOpen={setProblemModalOpen}
        collectionId={collectionId}
        problems={problems.map((item: any) => item.problem.link)}
      />

      {!isLoading && list && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          <Box>
            <Group position="apart">
              <Title order={3}>{list?.name}</Title>
              <Button size="xs" onClick={() => setOpen(true)}>
                Add collection
              </Button>
            </Group>
            <Breadcrumbs mt="xs">
              {items.map((item, index) => (
                <Anchor
                  key={index}
                  component={Link}
                  to={item.to}
                  size="sm"
                  sx={{
                    color: theme.colors.gray[4],
                    fontWeight: 500,
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  {item.label}
                </Anchor>
              ))}
            </Breadcrumbs>
          </Box>

          <Tabs defaultValue="gallery" mt="lg">
            <Tabs.List>
              <Tabs.Tab value="gallery" icon={<IconList size={14} />}>
                Problems
              </Tabs.Tab>
              <Tabs.Tab value="messages" icon={<IconChartBar size={14} />}>
                Progress
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery">
              <Box sx={{ maxWidth: "1024px", margin: "0 auto" }}>
                <Paper mt="md" sx={{ overflow: "clip" }}>
                  {list?.collections?.length === 0 ? (
                    <Stack p="xl">
                      <Group>
                        <IconAlertCircle />
                        <Text>
                          Looks like you have no collection in the list. Consider creating a
                          collection and add problems.
                        </Text>
                      </Group>
                      <Group>
                        <Button size="xs" onClick={() => setOpen(true)}>
                          Add collection
                        </Button>
                      </Group>
                    </Stack>
                  ) : (
                    <Box>
                      <Accordion
                        multiple
                        defaultValue={list.collections.map((collection: any) =>
                          collection.id.toString()
                        )}
                      >
                        {list?.collections?.map((collection: any) => {
                          return (
                            <Accordion.Item
                              sx={{ borderRadius: "8px" }}
                              key={collection.id.toString()}
                              value={collection.id.toString()}
                            >
                              <Accordion.Control
                                sx={{
                                  borderBottom: "1px solid",
                                  borderColor:
                                    theme.colorScheme === "dark"
                                      ? theme.colors.dark[4]
                                      : theme.colors.gray[2],
                                }}
                              >
                                <Group position="apart">
                                  <Group>
                                    <Title order={4}>{collection.name}</Title>{" "}
                                    <Badge
                                      color="blue"
                                      variant="filled"
                                      px={0}
                                      py={0}
                                      sx={{ height: 20, width: 20 }}
                                    >
                                      {collection?.problems?.length}
                                    </Badge>
                                  </Group>
                                  <ActionIcon
                                    component="div"
                                    color="indigo"
                                    variant="light"
                                    onClick={(e) => {
                                      setCollectionId(collection.id)
                                      e.stopPropagation()
                                      setProblemModalOpen(true)
                                      setProblems(collection?.problems)
                                    }}
                                  >
                                    <IconEdit size={14} />
                                  </ActionIcon>
                                </Group>
                              </Accordion.Control>
                              <Accordion.Panel px="sm">
                                {collection?.problems?.length === 0 ? (
                                  <Group>
                                    <Text color="dimmed">
                                      Looks like you have no problems in this collection. Consider
                                      adding problems.
                                    </Text>
                                  </Group>
                                ) : (
                                  <Box>
                                    {collection?.problems?.map((item: any) => {
                                      return (
                                        <Box key={item.id} py="xs">
                                          <ProblemCard
                                            pid={item?.problem?.pid}
                                            name={item?.problem?.name}
                                            link={item?.problem?.link}
                                          />
                                        </Box>
                                      )
                                    })}
                                  </Box>
                                )}
                              </Accordion.Panel>
                            </Accordion.Item>
                          )
                        })}
                      </Accordion>
                    </Box>
                  )}
                </Paper>
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value="messages" pt="xs">
              Messages tab content
            </Tabs.Panel>
          </Tabs>
        </motion.div>
      )}
    </DashboardLayout>
  )
}
