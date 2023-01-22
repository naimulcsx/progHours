import { AnimatePresence, motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { DashboardLayout } from "~/components/templates"
import {
  AverageDifficultyChart,
  MostSolvedCategoriesChart,
  TimeSpentChart,
  WeeklySolvedChart,
} from "~/components/molecules"
import ProfileStats from "~/components/organisms/profile-stats/ProfileStats"
import useUser from "~/hooks/useUser"
import { Alert, Anchor, Box, Grid, Group, Loader, Title } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons"
import type { Statistics } from "~/components/pages/dashboard/Dashboard"

export interface DashboardTemplateProps {
  statistics?: Statistics
  isLoading: boolean
}

export default function DashboardTemplate({ statistics, isLoading }: DashboardTemplateProps) {
  const { user } = useUser()
  const profileCompleted = user?.batch && user?.department && user?.mobile && user?.section
  return (
    <DashboardLayout>
      {/* page meta data */}
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {/* profile complete warning */}
      {!profileCompleted && (
        <Alert
          mb="lg"
          icon={<IconAlertCircle size={24} />}
          color="red"
          title="Your profile is currently incomplete!"
          sx={{
            border: "1px solid",
            borderColor: "#ff6b6b",
          }}
        >
          In order to fully use the features of our platform, we recommend completing your profile
          as soon as possible. Click{" "}
          <Anchor component={Link} to="/settings?tab=user" color="red">
            here
          </Anchor>{" "}
          to access your profile settings and complete the necessary information.
        </Alert>
      )}

      {/* page title */}
      <Group align="center" mb="md">
        <Title order={3}>Dashboard</Title>
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

      {/* dashboard statistics */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          {!isLoading && statistics && (
            <>
              {/* profile card */}
              <Box mb={8}>
                <ProfileStats statistics={statistics} />
              </Box>

              {/* visualizations */}
              <Grid sx={{ alignItems: "stretch" }}>
                <Grid.Col md={6}>{<WeeklySolvedChart data={statistics.frequency} />}</Grid.Col>
                <Grid.Col md={6}>
                  <MostSolvedCategoriesChart data={statistics.tagsFrequency} />
                </Grid.Col>
                <Grid.Col md={6}>
                  <TimeSpentChart data={statistics.tagsSolveTime} />
                </Grid.Col>
                <Grid.Col md={6}>
                  <AverageDifficultyChart avgDifficulty={statistics.avgDifficulty} />
                </Grid.Col>
              </Grid>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  )
}
