import { getAllUserStudy } from "~/api/userStudies"
import { DashboardLayout } from "~/components/templates"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { Box, Button, Grid, Group, Loader, Text, Title } from "@mantine/core"
import { IconPlus } from "@tabler/icons"
import { AnimatePresence, motion } from "framer-motion"
import StudyItemCard from "~/components/molecules/study-item-card/StudyItemCard"
import { StudyFormModal } from "~/components/molecules"

export interface StudyListTemplateProps {
  userStudies: any[]
  isLoading: boolean
}

export default function StudyListTemplate({ userStudies, isLoading }: StudyListTemplateProps) {
  const [open, setOpen] = useState(false)
  return (
    <DashboardLayout>
      <Helmet>
        <title>Study List</title>
      </Helmet>

      {/* page header */}
      <Group position="apart" mb="md">
        <Group align="center" mb="md">
          <Title order={3}>Study List</Title>
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
        <Button
          size="xs"
          onClick={() => setOpen(true)}
          type="button"
          leftIcon={<IconPlus size={16} />}
        >
          Add New
        </Button>
      </Group>

      {/* show user studies */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            <Box>
              {userStudies.length === 0 ? (
                <Text>No resources added.</Text>
              ) : (
                <Grid>
                  {userStudies.map((item: any) => (
                    <Grid.Col key={item.id} md={6} lg={3}>
                      <StudyItemCard {...item} />
                    </Grid.Col>
                  ))}
                </Grid>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* add study modal */}
      <StudyFormModal open={open} setOpen={setOpen} />
    </DashboardLayout>
  )
}
