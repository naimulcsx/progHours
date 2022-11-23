import { getAllHandles } from "~/api/handle"
import { CCIcon, CFIcon, LightOJIcon, TophIcon } from "~/components/Icons"
import PopupBuilder from "~/components/PopupBuilder"
import { Box, Button, Grid, Group, Paper, Text, Title } from "@mantine/core"
import { useState } from "react"
import { useQuery } from "react-query"
import HandleForm from "./HandleForm"
import HandleOJBox from "./HandleOJBox"
import { IconPlus } from "@tabler/icons"

const HandleSettings = () => {
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

      <PopupBuilder title="Add a new handle" setIsOpen={setIsOpen} isOpen={isOpen}>
        <HandleForm setIsOpen={setIsOpen} isCreate={true} />
      </PopupBuilder>

      <Box mt={10}>
        <Grid>
          {handles.map((item: any) => {
            const iconMap: any = {
              Codeforces: <CFIcon />,
              CodeChef: <CCIcon />,
              Toph: <TophIcon />,
              LightOJ: <LightOJIcon />,
            }
            return (
              <Grid.Col md={6} lg={4} key={item.id}>
                <HandleOJBox
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

export default HandleSettings
