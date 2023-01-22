import { getAllHandles } from "~/api/handle"
import { CCIcon, CFIcon, LOJIcon, TophIcon } from "~/components/atoms/icons"
import { Box, Button, Grid, Group, Modal, Paper, Text, Title } from "@mantine/core"
import { useState } from "react"
import { useQuery } from "react-query"
import { IconPlus } from "@tabler/icons"
import SettingsHandleCard from "../settings-handle-card/SettingsHandleCard"
import SettingsHandleForm from "../settings-handle-form/SettingsHandleForm"

export default function SettingsHandles() {
  const [handles, setHandles] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  // find handle
  useQuery("handles", getAllHandles, {
    onSuccess: (data) => {
      setHandles(data?.body.handles)
    },
  })

  return (
    <Paper p={24}>
      <Group sx={{ justifyContent: "space-between" }} mb="md">
        <Title order={4}>Handles</Title>
        <Button size="xs" onClick={() => setIsOpen(true)} leftIcon={<IconPlus size={16} />}>
          Add Handle
        </Button>
      </Group>

      {handles?.length === 0 && <Text>You haven't included any handles yet.</Text>}

      <Modal
        title={<Title order={4}>Add a new handle</Title>}
        onClose={() => setIsOpen(false)}
        opened={isOpen}
      >
        <SettingsHandleForm setIsOpen={setIsOpen} isCreate={true} />
      </Modal>

      <Box mt={10}>
        <Grid>
          {handles.map((item: any) => {
            const iconMap: any = {
              Codeforces: <CFIcon />,
              CodeChef: <CCIcon />,
              Toph: <TophIcon />,
              LightOJ: <LOJIcon />,
            }
            return (
              <Grid.Col md={6} lg={4} key={item.id}>
                <SettingsHandleCard
                  icon={iconMap[item.onlineJudge.name]}
                  handle={item.handle}
                  onlineJudge={item.onlineJudge}
                />
              </Grid.Col>
            )
          })}
        </Grid>
      </Box>
    </Paper>
  )
}
