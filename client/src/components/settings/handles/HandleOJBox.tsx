import PopupBuilder from "~/components/PopupBuilder"
import getOJProfileURL from "~/utils/getOJProfileUrl"
import { ExternalLinkIcon, PencilAltIcon } from "@heroicons/react/outline"
import { ActionIcon, Box, Group, Paper, Stack, Text, Title, useMantineTheme } from "@mantine/core"
import { useState } from "react"
import DeleteHandle from "./DeleteHandle"
import HandleForm from "./HandleForm"
import { IconEdit, IconExternalLink, IconPencil, IconPencilOff } from "@tabler/icons"

const HandleOJBox = ({ icon, handle, onlineJudge }: any) => {
  const theme = useMantineTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box
      p="lg"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderRadius: theme.radius.md,
        background: "#272a3c",
      }}
    >
      <Group>
        <Box
          sx={{
            width: 48,
            height: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            // border: "1px solid",
            background: theme.colors.dark[3],
            borderRadius: "50%",
          }}
        >
          {icon}
        </Box>
        <Stack spacing={1}>
          <Title order={5}>{onlineJudge.name}</Title>
          <Text size="sm" color="dimmed">
            {handle}
          </Text>
        </Stack>
      </Group>

      <Stack spacing={1} align="end">
        <ActionIcon
          component="a"
          target="_blank"
          href={getOJProfileURL(onlineJudge.name, handle)}
          variant="transparent"
          color="blue"
        >
          <IconExternalLink size={16} />
        </ActionIcon>
        <Group spacing={2}>
          <ActionIcon variant="transparent" color="green" onClick={() => setIsOpen(true)}>
            <IconEdit size={16} />
          </ActionIcon>
          <PopupBuilder isOpen={isOpen} setIsOpen={setIsOpen} title={`Edit ${onlineJudge.name} handle`}>
            <HandleForm setIsOpen={setIsOpen} handle={handle} onlineJudge={onlineJudge} />
          </PopupBuilder>
          <DeleteHandle title={onlineJudge.name} id={onlineJudge.id} />
        </Group>
      </Stack>
    </Box>
  )
}

export default HandleOJBox
