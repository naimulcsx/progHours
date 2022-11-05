import PopupBuilder from "~/components/PopupBuilder"
import getOJProfileURL from "~/utils/getOJProfileUrl"
import { ExternalLinkIcon, PencilAltIcon } from "@heroicons/react/outline"
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { useState } from "react"
import DeleteHandle from "./DeleteHandle"
import HandleForm from "./HandleForm"

const HandleOJBox = ({ icon, handle, onlineJudge }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        justifyContent: "space-between",
        padding: "18px",
        borderRadius: "6px",
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      }}
    >
      <Group>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "3px",
            border: "1px solid #d1d5db",
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
          href={getOJProfileURL(onlineJudge.name, handle)}
          variant="transparent"
          color="blue"
        >
          <ExternalLinkIcon width={20} />
        </ActionIcon>
        <Group spacing={2}>
          <ActionIcon
            variant="transparent"
            color="green"
            onClick={() => setIsOpen(true)}
          >
            <PencilAltIcon width={20} />
          </ActionIcon>
          <PopupBuilder
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={`Edit ${onlineJudge.name} handle`}
          >
            <HandleForm
              setIsOpen={setIsOpen}
              handle={handle}
              onlineJudge={onlineJudge}
            />
          </PopupBuilder>
          <DeleteHandle title={onlineJudge.name} id={onlineJudge.id} />
        </Group>
      </Stack>
    </Box>
  )
}

export default HandleOJBox
