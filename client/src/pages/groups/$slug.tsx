import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGroupByHashtag } from "~/api/groups"
import { useQuery } from "react-query"
import { AnimateLoading } from "~/components/AnimateLoading"

import { TabList, TabPanels, Tab, TabPanel, useClipboard } from "@chakra-ui/react"
import LeaderboardTable from "~/components/leaderboard/TableDesktop"
import processRanklist from "~/utils/processRanklist"
import { getAvatarColors } from "~/utils/getAvatarColors"
import { ClipboardCheckIcon, ClipboardCopyIcon, PlusIcon } from "@heroicons/react/outline"
import MemberCard from "~/components/groups/MemberCard"
import { AddUserToGroupModal } from "~/components/modals/AddUserToGroupModal"
import UpdateGroup from "~/components/groups/UpdateGroup"
import useUser from "~/hooks/useUser"
import { Tabs, SimpleGrid, Title, Group, Loader, Box } from "@mantine/core"
import { IconChartBar, IconSettings, IconUsers } from "@tabler/icons"
import { AnimatePresence, motion } from "framer-motion"
import Leaderboard from "~/components/leaderboard"

const GroupPage = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { hashtag } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const { data, isLoading, isFetching } = useQuery(`groups/${hashtag}`, () => getGroupByHashtag(hashtag))
  const { hasCopied, onCopy } = useClipboard(data?.body?.group?.accessCode || "")
  return (
    <DashboardLayout
    // rightButton={
    //   <ButtonGroup>
    //     <AddUserToGroupModal
    //       isOpen={isOpen}
    //       setIsOpen={setIsOpen}
    //       groupName={data?.body?.group?.name}
    //       groupId={data?.body?.group?.id}
    //       hashtag={data?.body?.group?.hashtag}
    //     />
    //     {data?.body?.isOwner && (
    //       <>
    //         <IconButton
    //           aria-label="Add Member"
    //           icon={<PlusIcon height={20} />}
    //           size="sm"
    //           display={{ lg: "none", base: "flex" }}
    //           onClick={() => setIsOpen(true)}
    //         />

    //         <Button
    //           aria-label="Add Member"
    //           leftIcon={<PlusIcon height={20} />}
    //           size="sm"
    //           display={{ lg: "flex", base: "none" }}
    //           onClick={() => setIsOpen(true)}
    //         >
    //           Add Member
    //         </Button>
    //       </>
    //     )}
    //     <Button
    //       size="sm"
    //       onClick={onCopy}
    //       colorScheme="purple"
    //       variant="outline"
    //       leftIcon={hasCopied ? <ClipboardCheckIcon height={16} /> : <ClipboardCopyIcon height={16} />}
    //     >
    //       <Text>{hasCopied ? `Copied` : `${data?.body?.group?.accessCode}`}</Text>
    //     </Button>
    //   </ButtonGroup>
    // }
    >
      {/* @ts-ignore */}

      {/* {data && (
          <>
            <Helmet>
              <title>Group: {data.body.group.name}</title>
            </Helmet>
            <Tabs>
              <TabList>
                <Tab fontSize={["14px", "16px"]}>Members</Tab>
                <Tab fontSize={["14px", "16px"]}> Leaderboard</Tab>
                {data?.body?.isOwner && <Tab fontSize={["sm", "16px"]}>Settings</Tab>}
              </TabList>
              <TabPanels>
                <TabPanel mx={-4} mb={14}>
                  <SimpleGrid columns={[1, 2, 3, 4, 5, 5]} gap={4}>
                    {data.body.users.map((userGroup: any) => {
                      return (
                        <MemberCard
                          key={userGroup.user.id}
                          groupId={data.body.group.id}
                          hashtag={data.body.group.hashtag}
                          {...userGroup}
                        />
                      )
                    })}
                  </SimpleGrid>
                </TabPanel>
                <TabPanel mx={-4} mb={8}>
                  <LeaderboardTable ranklist={processRanklist(data.body.ranklist)} isPublic={false}></LeaderboardTable>
                </TabPanel>
                {data?.body?.isOwner && <TabPanel mb={14}>{<UpdateGroup group={data.body.group} />}</TabPanel>}
              </TabPanels>
            </Tabs>
          </>
        )} */}

      <Group position="apart" align="start">
        <Group align="center" mb="md">
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
                <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
                  Settings
                </Tabs.Tab>
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

              <Tabs.Panel value="settings" pt="xs">
                {data?.body?.group && <UpdateGroup group={data.body.group} />}
              </Tabs.Panel>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}

export default GroupPage
