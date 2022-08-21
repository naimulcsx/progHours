import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import { useContext, useState } from "react"
import { GlobalContext } from "@/GlobalStateProvider"
import { useNavigate, useParams } from "react-router-dom"
import { getGroupByHashtag } from "@/api/groups"
import { useQuery } from "react-query"
import { AnimateLoading } from "@/components/AnimateLoading"

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Text,
  Button,
  useClipboard,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react"
import LeaderboardTable from "@/components/leaderboard/Table"
import processRanklist from "@/utils/processRanklist"
import { getAvatarColors } from "@/utils/getAvatarColors"
import {
  ClipboardCheckIcon,
  ClipboardCopyIcon,
  PlusIcon,
} from "@heroicons/react/solid"
import MemberCard from "@/components/groups/MemberCard"
import { AddUserToGroupModal } from "@/components/modals/AddUserToGroupModal"
import UpdateGroup from "@/components/groups/UpdateGroup"

const GroupPage = () => {
  const navigate = useNavigate()
  const { user } = useContext(GlobalContext)
  const { hashtag } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useQuery(`groups/${hashtag}`, () =>
    getGroupByHashtag(hashtag)
  )
  const { hasCopied, onCopy } = useClipboard(
    data?.body?.group?.accessCode || ""
  )
  return (
    <DashboardLayout
      title={data?.body?.group?.name}
      rightButton={
        <ButtonGroup>
          <AddUserToGroupModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            groupName={data?.body?.group?.name}
            groupId={data?.body?.group?.id}
            hashtag={data?.body?.group?.hashtag}
          />
          {data?.body?.isOwner && (
            <>
              <IconButton
                aria-label="Add Member"
                icon={<PlusIcon height={20} />}
                size="sm"
                display={{ lg: "none", base: "flex" }}
                onClick={() => setIsOpen(true)}
              />

              <Button
                aria-label="Add Member"
                leftIcon={<PlusIcon height={20} />}
                size="sm"
                display={{ lg: "flex", base: "none" }}
                onClick={() => setIsOpen(true)}
              >
                Add Member
              </Button>
            </>
          )}
          <Button
            size="sm"
            onClick={onCopy}
            colorScheme="purple"
            variant="outline"
            leftIcon={
              hasCopied ? (
                <ClipboardCheckIcon height={16} />
              ) : (
                <ClipboardCopyIcon height={16} />
              )
            }
          >
            <Text>
              {hasCopied ? `Copied` : `${data?.body?.group?.accessCode}`}
            </Text>
          </Button>
        </ButtonGroup>
      }
    >
      {/* @ts-ignore */}

      <AnimateLoading isLoaded={data}>
        {data && (
          <>
            {/* @ts-ignore */}
            <Helmet>
              <title>Group: {data.body.group.name}</title>
            </Helmet>
            <Tabs>
              <TabList>
                <Tab fontSize={["14px", "16px"]}>Members</Tab>
                <Tab fontSize={["14px", "16px"]}> Leaderboard</Tab>
                {data?.body?.isOwner && (
                  <Tab fontSize={["sm", "16px"]}>Settings</Tab>
                )}
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
                  <LeaderboardTable
                    ranklist={processRanklist(data.body.ranklist)}
                    isPublic={false}
                  ></LeaderboardTable>
                </TabPanel>
                {data?.body?.isOwner && (
                  <TabPanel mb={14}>
                    {<UpdateGroup group={data.body.group} />}
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          </>
        )}
      </AnimateLoading>
    </DashboardLayout>
  )
}

export default GroupPage
