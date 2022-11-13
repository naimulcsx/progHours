import { useState } from "react"
import { Box, Button, Group, Loader, SimpleGrid, Text, Title } from "@mantine/core"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { motion } from "framer-motion"
import { IconPlus } from "@tabler/icons"
import { AnimatePresence } from "framer-motion"

import { DashboardLayout } from "~/components/layouts/Dashboard"
import { getUserGroups } from "~/api/groups"
import CreateGroupModal from "~/components/modals/CreateGroupModal"
import GroupCard from "~/components/groups/GroupCard"
import { JoinGroupModal } from "~/components/modals/JoinGroupModal"
import useUser from "~/hooks/useUser"

export default function GroupsPage() {
  const { user } = useUser()

  // fetch groups data
  const { data, isLoading, isFetching } = useQuery(["groups"], getUserGroups)

  // modal states
  const [createIsOpen, setCreateIsOpen] = useState(false)
  const [joinIsOpen, setJoinIsOpen] = useState(false)

  return (
    <DashboardLayout>
      {/* page meta data */}
      <Helmet>
        <title>Groups</title>
      </Helmet>

      {/* page title and buttons */}
      <Group position="apart" align="start">
        <Group align="center" mb="md">
          <Title order={3} sx={{ color: "white" }}>
            Groups
          </Title>
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
        <Box>
          {user?.role === "ADMIN" ? (
            <Button
              size="xs"
              sx={(theme) => ({ boxShadow: theme.shadows.sm })}
              leftIcon={<IconPlus size={16} />}
              onClick={() => setCreateIsOpen(true)}
            >
              Create group
            </Button>
          ) : (
            <Button
              size="xs"
              sx={(theme) => ({ boxShadow: theme.shadows.sm })}
              leftIcon={<IconPlus size={16} />}
              onClick={() => setJoinIsOpen(true)}
            >
              Join group
            </Button>
          )}
        </Box>
      </Group>

      {/* groups */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            <SimpleGrid
              breakpoints={[
                { maxWidth: 980, cols: 3, spacing: "md" },
                { maxWidth: 755, cols: 2, spacing: "sm" },
                { maxWidth: 600, cols: 1, spacing: "sm" },
              ]}
              cols={5}
              spacing="lg"
            >
              {data.body.groups.map((el: any) => (
                <GroupCard key={el.group.id} {...el} />
              ))}
            </SimpleGrid>
            {data.body.groups.length === 0 && <Text>You don't belong to any group.</Text>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* modals */}
      <JoinGroupModal isOpen={joinIsOpen} setIsOpen={setJoinIsOpen} />
      <CreateGroupModal isOpen={createIsOpen} setIsOpen={setCreateIsOpen} />
    </DashboardLayout>
  )
}
