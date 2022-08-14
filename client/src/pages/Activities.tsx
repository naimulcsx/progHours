import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import { useContext, useState } from "react"
import { GlobalContext } from "@/GlobalStateProvider"

import axios from "axios"
import { useQuery } from "react-query"
import moment from "moment"
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from "@heroicons/react/solid"
import { AnimateLoading } from "@/components/AnimateLoading"

const fetchActivities = (page = 1) =>
  fetch("/api/submissions/activities?page=" + page).then((res) => res.json())

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

  const bg = mode("white", "gray.800")
  const borderColor = mode("gray.200", "gray.700")
  const color = mode("gray.700", "gray.200")
  const linkColor = mode("blue.500", "blue.300")
  const lastPage = Math.ceil(totalSubmissions / 20)

  return (
    <DashboardLayout
      title="Recent Activities"
      rightButton={
        <HStack>
          <Text>
            {page} / {lastPage}
          </Text>
          <Button
            size="xs"
            variant="outline"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            <ChevronLeftIcon height={12} />
          </Button>
          <Button
            size="xs"
            variant="outline"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === lastPage}
          >
            <ChevronRightIcon height={12} />
          </Button>
        </HStack>
      }
    >
      {/* @ts-ignore */}
      <Helmet>
        <title>Recent Activities</title>
      </Helmet>

      <AnimateLoading isLoaded={submissions}>
        {submissions && (
          <Box
            bg={bg}
            mx={-4}
            borderTop="1px solid"
            borderColor={borderColor}
            pb={[10, 10, 0]}
          >
            {submissions.map((sub: any) => {
              return (
                <Box
                  key={sub.id}
                  borderBottom="1px solid"
                  borderColor={borderColor}
                  py={3}
                  px={8}
                  display="flex"
                  justifyContent="space-between"
                  flexDirection={["column", "row"]}
                >
                  <Flex align="center" gap={4}>
                    <Avatar size="sm" name={sub.user.name} fontWeight="bold" />
                    <Box>
                      <Link
                        as={RouterLink}
                        to={`/users/${sub.user.username}`}
                        color={linkColor}
                      >
                        {sub.user.name}
                      </Link>{" "}
                      got <Text display="inline-block">{sub.verdict}</Text> in{" "}
                      <Link
                        href={sub.problem.link}
                        target="_blank"
                        color={linkColor}
                      >
                        {sub.problem.name} [{sub.problem.pid}]
                      </Link>
                    </Box>
                  </Flex>
                  <Flex align="center" gap={2} color={color} ml={[12, 0]}>
                    <ClockIcon height={16} />
                    <Text>{moment(sub.solvedAt).fromNow()}</Text>
                  </Flex>
                </Box>
              )
            })}
          </Box>
        )}
      </AnimateLoading>
    </DashboardLayout>
  )
}

export default ActivitiesPage
