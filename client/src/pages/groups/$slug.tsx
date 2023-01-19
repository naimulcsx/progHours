import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getGroupBySlug } from "~/api/groups"
import { useQuery } from "react-query"

import MemberCard from "~/components/groups/MemberCard"
import UpdateGroup from "~/components/groups/UpdateGroup"
import useUser from "~/hooks/useUser"
import { Tabs, SimpleGrid, Title, Group, Loader, Box, CopyButton, Button, Select } from "@mantine/core"
import { IconChartBar, IconCopy, IconSettings, IconUserPlus, IconUsers } from "@tabler/icons"
import { AnimatePresence, motion } from "framer-motion"
import Leaderboard from "~/components/leaderboard"
import AddMembersModal from "~/components/modals/AddMembersModal"
import { getRankList } from "~/api/leaderboard"
import Groups from "~/types/Group"
import { RanklistItem } from "~/types/RanklistItem"
import UserGroups from "~/types/UserGroup"

interface Props {
  group: Groups
  isOwner: boolean
  isMember: boolean
  ranklist: RanklistItem
  users: UserGroups[]
}

const GroupPage = () => {
  const { slug } = useParams()
  const [open, setOpen] = useState(false)
  const [group, setGroup] = useState<Props>()

  const { isLoading, isFetching } = useQuery(`groups/${slug}`, () => getGroupBySlug(slug), {
    onSuccess: (data) => {
      setGroup(data?.body)
    },
  })

  const [leaderboardType, setLeaderboardType] = useState<"full" | "currentWeek" | "lastWeek" | "currentMonth">(
    "currentMonth"
  )
  const [dateRange, setDateRange] = useState<any>({})
  const {
    data: leaderboardData,
    isLoading: leaderboardLoading,
    isFetching: leaderboardFetching,
  } = useQuery(["ranklist", leaderboardType], () => getRankList(leaderboardType, slug), {
    onSuccess: (res) => {
      const { fromDate, toDate } = res.body
      if (fromDate && toDate) setDateRange({ from: fromDate, to: toDate })
      else setDateRange({})
    },
  })

  return (
    <DashboardLayout>
      {/* page title */}
      <Helmet>
        <title>{group?.group?.name || "Group"}</title>
      </Helmet>

      {/* add members modal */}
      <AddMembersModal
        isOpen={open}
        setIsOpen={setOpen}
        groupName={group?.group?.name}
        groupId={group?.group?.id}
        slug={group?.group?.slug}
      />

      {/* page title and buttons */}
      <Group position="apart" align="start" spacing={4} mb="md">
        <Group align="center">
          <Title order={3}>{group?.group?.name}</Title>
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
        <Group>
          {group?.isOwner && (
            <Button size="xs" leftIcon={<IconUserPlus size={14} />} onClick={() => setOpen(true)}>
              Add Members
            </Button>
          )}
          {group?.isMember && (
            <CopyButton value={group?.group?.accessCode}>
              {({ copied, copy }) => (
                <Button
                  variant="outline"
                  size="xs"
                  color={copied ? "blue" : "violet"}
                  onClick={copy}
                  leftIcon={<IconCopy size={16} />}
                >
                  {!copied ? group?.group?.accessCode : "Copied"}
                </Button>
              )}
            </CopyButton>
          )}
        </Group>
      </Group>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            <Tabs defaultValue="members">
              <Tabs.List>
                <Tabs.Tab value="members" icon={<IconUsers size={14} />}>
                  Members
                </Tabs.Tab>
                <Tabs.Tab value="leaderboard" icon={<IconChartBar size={14} />}>
                  Leaderboard
                </Tabs.Tab>
                {group?.isOwner && (
                  <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
                    Settings
                  </Tabs.Tab>
                )}
              </Tabs.List>

              <Tabs.Panel value="members" pt="xs">
                {group && (
                  <SimpleGrid
                    breakpoints={[
                      { minWidth: "sm", cols: 2 },
                      { minWidth: "md", cols: 3 },
                      { minWidth: 1200, cols: 5 },
                    ]}
                  >
                    {group?.users.map((userGroup) => {
                      return (
                        <MemberCard
                          key={userGroup.user.id}
                          group={group.group}
                          isOwner={group.isOwner}
                          userGroup={userGroup}
                        />
                      )
                    })}
                  </SimpleGrid>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="leaderboard" pt="xs">
                <Group position="apart" align="start" mb="md" mt="md">
                  <Group align="center">
                    <Title order={4}>Leaderboard</Title>
                    <AnimatePresence>
                      {(leaderboardLoading || leaderboardFetching) && (
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
                  <Box>
                    <Select
                      size="xs"
                      defaultValue="currentWeek"
                      onChange={(value: "full" | "currentWeek" | "lastWeek" | "currentMonth") => {
                        setLeaderboardType(value)
                      }}
                      data={[
                        {
                          value: "full",
                          label: "All Time",
                        },
                        {
                          value: "currentWeek",
                          label: "Current Week",
                        },
                        {
                          value: "lastWeek",
                          label: "Last Week",
                        },
                        {
                          value: "currentMonth",
                          label: "Current Month",
                        },
                        {
                          value: "lastMonth",
                          label: "Last Month",
                        },
                      ]}
                    />
                  </Box>
                </Group>
                <AnimatePresence>
                  {!leaderboardLoading && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ delay: 0.25, duration: 0.35 }}
                    >
                      <Box sx={{ marginLeft: -16, marginRight: -16 }}>
                        <Leaderboard data={leaderboardData?.body?.stats} loading={isLoading} />
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Tabs.Panel>

              {group?.isOwner && (
                <Tabs.Panel value="settings" pt="xs">
                  {group?.group && <UpdateGroup group={group.group} />}
                </Tabs.Panel>
              )}
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}

export default GroupPage
