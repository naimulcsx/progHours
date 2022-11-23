import moment from "moment"
import { useQuery } from "react-query"
import { Helmet } from "react-helmet-async"
import { Link as RouterLink } from "react-router-dom"
import { IconChevronLeft, IconChevronRight, IconClock } from "@tabler/icons"
import { useState } from "react"
import { ActionIcon, Anchor, Box, Group, Loader, Paper, Text, Title, useMantineTheme } from "@mantine/core"
import { AnimatePresence, motion } from "framer-motion"

import { DashboardLayout } from "~/components/layouts/Dashboard"
import Avatar from "~/components/Avatar"
import { fetchActivities } from "~/api/submissions"

const ActivitiesPage = () => {
  const theme = useMantineTheme()

  // pagination state
  const [page, setPage] = useState(1)
  const [submissions, setSubmissions] = useState([])
  const [totalSubmissions, setTotalSubmissions] = useState(0)

  // fetch data
  const { isLoading, isFetching, data } = useQuery(["activities", page], () => fetchActivities(page), {
    onSuccess(res) {
      setSubmissions(res.body.submissions)
      setTotalSubmissions(res.body.totalSubmissions)
    },
    refetchInterval: 30000,
  })

  // compute the last page
  const lastPage = Math.ceil(totalSubmissions / 20)

  return (
    <DashboardLayout>
      <Helmet>
        <title>Recent Activities</title>
      </Helmet>

      <Box sx={{ maxWidth: "1024px", margin: "0 auto" }}>
        {/* page title and buttons */}
        <Group position="apart" align="start">
          <Group align="center" mb="md">
            <Title order={3}>Activities</Title>
            <AnimatePresence>
              {(isLoading || isFetching) && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Loader size="xs" />
                </motion.div>
              )}
            </AnimatePresence>
          </Group>
          <Group spacing="xs">
            <Text size="sm">
              {page} / {lastPage}
            </Text>
            <ActionIcon variant="outline" onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
              <IconChevronLeft size={16} />
            </ActionIcon>
            <ActionIcon variant="outline" onClick={() => setPage((prev) => prev + 1)} disabled={lastPage <= 1}>
              <IconChevronRight size={16} />
            </ActionIcon>
          </Group>
        </Group>
        <Paper>
          <Box>
            {submissions.map((sub: any, idx: number) => {
              return (
                <Group
                  key={sub.id}
                  py="sm"
                  px="xl"
                  sx={{
                    width: "100%",
                    justifyContent: "space-between",
                    borderTop: idx > 0 ? "1px solid" : 0,
                    borderColor: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[3],
                  }}
                  spacing={4}
                >
                  <Group spacing={4}>
                    <Avatar name={sub.user.name} />
                    <Text size="sm">
                      <Anchor component={RouterLink} to={`/@${sub.user.username}`}>
                        {sub.user.name}
                      </Anchor>{" "}
                      got <Text component="span">{sub.verdict}</Text> in{" "}
                      <Anchor href={sub.problem.link} target="_blank">
                        {sub.problem.name} [{sub.problem.pid}]
                      </Anchor>
                    </Text>
                  </Group>

                  <Group spacing={6}>
                    <IconClock size={16} />
                    <Text size="sm">{moment(sub.solvedAt).fromNow()}</Text>
                  </Group>
                </Group>
              )
            })}
          </Box>
        </Paper>
      </Box>
    </DashboardLayout>
  )
}

export default ActivitiesPage
