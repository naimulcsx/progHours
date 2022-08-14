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
  Flex,
  Link,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

const ActivitiesPage = () => {
  const { user } = useContext(GlobalContext)

  const [submissions, setSubmissions] = useState<any>(null)
  const { data } = useQuery(
    "activities",
    () => axios.get("/api/submissions/all").then((res) => res.data),
    {
      onSuccess: (res) => {
        setSubmissions(res.body.submissions)
      },
      refetchInterval: 30000,
    }
  )
  const bg = mode("white", "gray.800")
  const borderColor = mode("gray.200", "gray.700")

  return (
    <DashboardLayout title="Recent Activities">
      {/* @ts-ignore */}
      <Helmet>
        <title>Recent Activities</title>
      </Helmet>

      {submissions && (
        <Box bg={bg} mx={-4} borderTop="1px solid" borderColor={borderColor}>
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
              >
                <Flex align="center" gap={4}>
                  <Avatar size="sm" name={sub.User.name} fontWeight="bold" />
                  <Text>
                    <Link as={RouterLink} to={`/users/${sub.User.username}`}>
                      {sub.User.name}
                    </Link>{" "}
                    got <Text display="inline-block">{sub.verdict}</Text> in{" "}
                    <Link href={sub.problem.link} target="_blank">
                      {sub.problem.name} [{sub.problem.pid}]
                    </Link>
                  </Text>
                </Flex>
                {moment(sub.solvedAt).fromNow()}
              </Box>
            )
          })}
        </Box>
      )}
    </DashboardLayout>
  )
}

export default ActivitiesPage
