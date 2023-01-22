import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { IconPlus } from "@tabler/icons"
import { AnimatePresence } from "framer-motion"
import { DashboardLayout } from "~/components/templates"
import { Box, Button, Group, Loader, SimpleGrid, Text, Title } from "@mantine/core"
import { GroupCard, GroupCreateModal } from "~/components/molecules"
import GroupJoinModal from "~/components/molecules/group-join-modal/GroupJoinModal"
import useUser from "~/hooks/useUser"

export interface GroupsTemplateProps {
  groups: any
  isLoading: boolean
}

export default function GroupsTemplate({ groups, isLoading }: GroupsTemplateProps) {
  const { user } = useUser()
  // join group modal state
  const [joinIsOpen, setJoinIsOpen] = useState(false)
  // create group modal state
  const [createIsOpen, setCreateIsOpen] = useState(false)
  return (
    <DashboardLayout>
      {/* page meta data */}
      <Helmet>
        <title>Groups</title>
      </Helmet>

      {/* page title and buttons */}
      <Group position="apart" align="start">
        <Group align="center" mb="md">
          <Title order={3}>Groups</Title>
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
              {groups?.map((item: any) => (
                <GroupCard key={item.group.id} item={item} />
              ))}
            </SimpleGrid>
            {groups?.length === 0 && <Text>You don't belong to any group.</Text>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* modals */}
      <GroupJoinModal open={joinIsOpen} setOpen={setJoinIsOpen} />
      <GroupCreateModal open={createIsOpen} setOpen={setCreateIsOpen} />
    </DashboardLayout>
  )
}
