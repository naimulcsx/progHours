import { Helmet } from "react-helmet-async"
import { useContext, useState } from "react"

/**
 * Import Components
 */
import { DashboardLayout } from "@/components/layouts/Dashboard"

/**
 * Import helpers
 */
import { GlobalContext } from "@/GlobalStateProvider"
import { getUserGroups } from "@/api/groups"
import { useQuery } from "react-query"
import { AnimateLoading } from "@/components/AnimateLoading"
import {
  Button,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import { PlusIcon, UserAddIcon } from "@heroicons/react/solid"
import { CreateGroupModal } from "@/components/modals/CreateGroupModal"
import GroupCard from "@/components/groups/GroupCard"
import { JoinGroupModal } from "@/components/modals/JoinGroupModal"

const GroupsPage = () => {
  const { user } = useContext(GlobalContext)
  const [isOpen, setIsOpen] = useState(false)
  const [joinIsOpen, setJoinIsOpen] = useState(false)
  const { data, isRefetching } = useQuery("groups", getUserGroups)
  let groups = data?.body?.groups || false
  return (
    <DashboardLayout
      title="Groups"
      rightButton={
        <>
          {user?.role === "ADMIN" ? (
            <Button
              size="sm"
              onClick={() => setIsOpen(true)}
              type="button"
              leftIcon={<PlusIcon width={20} />}
            >
              Create Group
            </Button>
          ) : (
            <Button
              size="sm"
              leftIcon={<UserAddIcon width={20} />}
              onClick={() => setJoinIsOpen(true)}
            >
              Join Group
            </Button>
          )}
        </>
      }
    >
      {/* @ts-ignore */}
      <Helmet>
        <title>Groups</title>
      </Helmet>
      <JoinGroupModal isOpen={joinIsOpen} setIsOpen={setJoinIsOpen} />
      <CreateGroupModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <AnimateLoading isLoaded={groups && !isRefetching}>
        {groups && (
          <>
            <SimpleGrid columns={[1, 2, 3, 4, 5, 5]} gap={4}>
              {groups.map((el: any) => (
                <GroupCard key={el.group.id} {...el} />
              ))}
            </SimpleGrid>
            {groups.length === 0 && <Text>You don't belong to any group.</Text>}
          </>
        )}
      </AnimateLoading>
    </DashboardLayout>
  )
}

export default GroupsPage
