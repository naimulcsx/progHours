import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "~/components/templates"
import { Dispatch, SetStateAction, useState } from "react"
import {
  Tabs,
  SimpleGrid,
  Title,
  Group,
  Loader,
  Box,
  CopyButton,
  Button,
  Select,
} from "@mantine/core"
import {
  IconCalendarEvent,
  IconChartBar,
  IconCopy,
  IconSettings,
  IconSum,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons"
import { AnimatePresence, motion } from "framer-motion"
import { GroupProblemLists, Leaderboard } from "~/components/organisms"
import { GroupMemberCard, GroupUpdateForm } from "~/components/molecules"
import GroupAddMembersModal from "~/components/molecules/group-add-members-modal/GroupAddMembersModal"
import ProgressTable from "~/components/organisms/group-progress-table/GroupProgressTable"

type LeaderboardType = "full" | "currentWeek" | "lastWeek" | "currentMonth" | "lastMonth"

export interface GroupDetailsTemplateProps {
  group: any
  leaderboard: any
  problemLists: any
  isLoading: boolean
  leaderboardType: LeaderboardType
  setLeaderboardType: Dispatch<SetStateAction<LeaderboardType>>
}

export default function GroupDetailsTemplate({
  group,
  leaderboard,
  isLoading,
  leaderboardType,
  problemLists,
  setLeaderboardType,
}: GroupDetailsTemplateProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string | null>("members")

  return (
    <DashboardLayout>
      {/* page title */}
      <Helmet>
        <title>{group?.group?.name || "Group"}</title>
      </Helmet>

      {/* add members modal */}
      <GroupAddMembersModal
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
            {isLoading && (
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
            <Tabs value={activeTab} onTabChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab value="members" icon={<IconUsers size={14} />}>
                  Members
                </Tabs.Tab>
                <Tabs.Tab value="lists" icon={<IconUsers size={14} />}>
                  Problem Lists
                </Tabs.Tab>
                <Tabs.Tab value="leaderboard" icon={<IconChartBar size={14} />}>
                  Leaderboard
                </Tabs.Tab>
                {group?.isOwner && (
                  <Tabs.Tab value="progress" icon={<IconCalendarEvent size={14} />}>
                    Activity Calander
                  </Tabs.Tab>
                )}
                {group?.isOwner && (
                  <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
                    Settings
                  </Tabs.Tab>
                )}
              </Tabs.List>

              {group?.isOwner && (
                <Tabs.Panel value="progress" pt="md">
                  <Box>
                    <ProgressTable />
                  </Box>
                </Tabs.Panel>
              )}

              <Tabs.Panel value="lists" pt="md">
                <GroupProblemLists groupId={group?.group?.id} problemLists={problemLists} />
              </Tabs.Panel>

              <Tabs.Panel value="members" pt="md">
                {group && (
                  <SimpleGrid
                    breakpoints={[
                      { minWidth: "sm", cols: 2 },
                      { minWidth: "md", cols: 3 },
                      { minWidth: 1200, cols: 5 },
                    ]}
                  >
                    {group?.users.map((userGroup: any) => {
                      return (
                        <GroupMemberCard
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

              <Tabs.Panel value="leaderboard" pt="md">
                <Group position="apart" align="start" mb="md">
                  <Group align="center">
                    <Title order={4}>Leaderboard</Title>
                    <AnimatePresence>
                      {isLoading && (
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
                      defaultValue={leaderboardType}
                      onChange={(
                        value: "full" | "currentWeek" | "lastWeek" | "currentMonth" | "lastMonth"
                      ) => {
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
                  {leaderboard && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ delay: 0.25, duration: 0.35 }}
                    >
                      <Box sx={{ marginLeft: -16, marginRight: -16 }}>
                        <Leaderboard data={leaderboard} />
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Tabs.Panel>

              {group?.isOwner && (
                <Tabs.Panel value="settings" pt="md">
                  {group?.group && <GroupUpdateForm group={group.group} />}
                </Tabs.Panel>
              )}
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}
