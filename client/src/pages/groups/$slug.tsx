import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGroupByHashtag } from "~/api/groups"
import { useQuery } from "react-query"

import MemberCard from "~/components/groups/MemberCard"
import UpdateGroup from "~/components/groups/UpdateGroup"
import useUser from "~/hooks/useUser"
import { Tabs, SimpleGrid, Title, Group, Loader, Box, CopyButton, Button } from "@mantine/core"
import { IconChartBar, IconCopy, IconSettings, IconUserPlus, IconUsers } from "@tabler/icons"
import { AnimatePresence, motion } from "framer-motion"
import Leaderboard from "~/components/leaderboard"
import AddMembersModal from "~/components/modals/AddMembersModal"

const GroupPage = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { hashtag } = useParams()
  const [open, setOpen] = useState(false)
  const { data, isLoading, isFetching } = useQuery(`groups/${hashtag}`, () => getGroupByHashtag(hashtag))

  return (
    <DashboardLayout>
      {/* page title */}
      <Helmet>
        <title>{data?.body?.group?.name || "Group"}</title>
      </Helmet>

      {/* add members modal */}
      <AddMembersModal
        isOpen={open}
        setIsOpen={setOpen}
        groupName={data?.body?.group?.name}
        groupId={data?.body?.group?.id}
        hashtag={data?.body?.group?.hashtag}
      />

      {/* page title and buttons */}
      <Group position="apart" align="start" spacing={4} mb="md">
        <Group align="center">
          <Title order={3}>{data?.body?.group?.name}</Title>
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
          {data?.body?.isOwner && (
            <Button size="xs" leftIcon={<IconUserPlus size={14} />} onClick={() => setOpen(true)}>
              Add Members
            </Button>
          )}
          {data?.body?.isMember && (
            <CopyButton value={data?.body?.group?.accessCode}>
              {({ copied, copy }) => (
                <Button
                  variant="outline"
                  size="xs"
                  color={copied ? "blue" : "violet"}
                  onClick={copy}
                  leftIcon={<IconCopy size={16} />}
                >
                  {!copied ? data?.body?.group?.accessCode : "Copied"}
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
                {data?.body?.isOwner && (
                  <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
                    Settings
                  </Tabs.Tab>
                )}
              </Tabs.List>

              <Tabs.Panel value="members" pt="xs">
                {data && (
                  <SimpleGrid
                    breakpoints={[
                      { minWidth: "sm", cols: 2 },
                      { minWidth: "md", cols: 3 },
                      { minWidth: 1200, cols: 5 },
                    ]}
                  >
                    {data.body.users.map((userGroup: any) => {
                      return (
                        <MemberCard
                          key={userGroup.user.id}
                          groupId={data.body.group.id}
                          hashtag={data.body.group.hashtag}
                          isOwner={data.body.isOwner}
                          {...userGroup}
                        />
                      )
                    })}
                  </SimpleGrid>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="leaderboard" pt="xs">
                <Box sx={{ marginLeft: -16, marginRight: -16 }}>
                  <Leaderboard data={data?.body?.ranklist} isLoading={isLoading} />
                </Box>
              </Tabs.Panel>

              {data?.body?.isOwner && (
                <Tabs.Panel value="settings" pt="xs">
                  {data?.body?.group && <UpdateGroup group={data.body.group} />}
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
