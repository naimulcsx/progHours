import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import { useContext, useState } from "react"

import axios from "axios"
import { useQuery } from "react-query"
import moment from "moment"
// import { Avatar, Badge, Box, Button, Flex, HStack, Link, Text, useColorModeValue as mode } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon } from "@heroicons/react/outline"
import { AnimateLoading } from "~/components/AnimateLoading"
import { Anchor, Box, Group, Paper, Stack, Text } from "@mantine/core"
import Avatar from "~/components/Avatar"

const fetchActivities = (page = 1) => fetch("/api/submissions/activities?page=" + page).then((res) => res.json())

const ActivitiesPage = () => {
  const [page, setPage] = useState(1)
  const [totalSubmissions, setTotalSubmissions] = useState(0)
  const [submissions, setSubmissions] = useState<any>(null)

  useQuery(["activities", page], () => fetchActivities(page), {
    onSuccess: (res) => {
      setSubmissions(res.body.submissions)
      setTotalSubmissions(res.body.totalSubmissions)
    },
    refetchInterval: 30000,
  })

  const lastPage = Math.ceil(totalSubmissions / 20)

  return (
    <DashboardLayout
    // rightButton={
    //   <HStack>
    //     <Text>
    //       {page} / {lastPage}
    //     </Text>
    //     <Button
    //       size="xs"
    //       variant="outline"
    //       onClick={() => setPage((prev) => prev - 1)}
    //       disabled={page === 1}
    //     >
    //       <ChevronLeftIcon height={12} />
    //     </Button>
    //     <Button
    //       size="xs"
    //       variant="outline"
    //       onClick={() => setPage((prev) => prev + 1)}
    //       disabled={page === lastPage}
    //     >
    //       <ChevronRightIcon height={12} />
    //     </Button>
    //   </HStack>
    // }
    >
      {/* @ts-ignore */}
      <Helmet>
        <title>Recent Activities</title>
      </Helmet>

      <AnimateLoading isLoaded={submissions}>
        {submissions && (
          <Paper sx={{ maxWidth: "1024px", margin: "0 auto" }} p="xl">
            <Stack>
              {submissions.map((sub: any) => {
                return (
                  <Group key={sub.id} sx={{ width: "100%", justifyContent: "space-between" }}>
                    <Group>
                      <Avatar name={sub.user.name} />
                      <Text>
                        <Anchor component={RouterLink} to={`/users/${sub.user.username}`}>
                          {sub.user.name}
                        </Anchor>{" "}
                        got <Text component="span">{sub.verdict}</Text> in{" "}
                        <Anchor href={sub.problem.link} target="_blank">
                          {sub.problem.name} [{sub.problem.pid}]
                        </Anchor>
                      </Text>
                    </Group>
                    <Group>
                      <ClockIcon height={16} />
                      <Text>{moment(sub.solvedAt).fromNow()}</Text>
                    </Group>
                  </Group>
                )
              })}
            </Stack>
          </Paper>
        )}
      </AnimateLoading>
    </DashboardLayout>
  )
}

export default ActivitiesPage
