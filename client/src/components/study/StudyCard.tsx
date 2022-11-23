import { ActionIcon, Box, Button, Group, Menu, Paper, Text, Title, useMantineTheme } from "@mantine/core"
import {
  IconCaretRight,
  IconDotsVertical,
  IconEdit,
  IconExternalLink,
  IconLanguage,
  IconNews,
  IconTrash,
  IconVideo,
} from "@tabler/icons"
import moment from "moment"
import { useState } from "react"
import PopupBuilder from "../PopupBuilder"
import DeleteStudyList from "./DeleteStudyList"
import StudyForm from "./StudyForm"

interface Study {
  title: string
  type: string
  language: string
  link: string
  difficulty: string
  studyDate: any
  studyTime: number
}

export default function StudyCard(props: Study) {
  const theme = useMantineTheme()

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const { title, type, language, link, difficulty, studyTime, studyDate } = props

  return (
    <Paper p="lg" sx={{ borderRadius: theme.radius.md, position: "relative" }}>
      <Group position="apart">
        <Title order={4}>{title}</Title>
        <Menu>
          <Menu.Target>
            <Button color="gray" variant="subtle" size="xs" sx={{ position: "absolute", top: 8, right: 8, padding: 4 }}>
              <IconDotsVertical size={16} />
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              component="a"
              icon={<IconExternalLink size={16} />}
              target="_blank"
              href={link}
              sx={{ height: 36 }}
            >
              View Resource
            </Menu.Item>
            <Menu.Item icon={<IconEdit size={14} />} onClick={() => setEditOpen(true)}>
              Edit Resource
            </Menu.Item>
            <Menu.Item icon={<IconTrash size={14} />} onClick={() => setDeleteOpen(true)}>
              Delete Resource
            </Menu.Item>

            {/* Other items ... */}
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Group position="apart" my="sm">
        <Text size="sm">{studyTime} minutes</Text>
        <Text size="sm"> {moment(studyDate).format("ll")}</Text>
      </Group>

      <Group position="apart">
        <Group spacing={4}>
          {type === "Video" ? <IconVideo size={16} /> : <IconNews size={16} />}
          <Text size="sm">{type}</Text>
        </Group>
        <Group spacing={4}>
          <IconLanguage size={16} />
          <Text size="sm">{language}</Text>
        </Group>
      </Group>

      <Group align="center" spacing={6} mt="sm">
        {[1, 2, 3].map((circle) => {
          const map: any = {
            Beginner: 1,
            Intermediate: 2,
            Advanced: 3,
          }
          while (circle <= map[difficulty]) {
            return (
              <Box
                key={circle}
                sx={(theme) => ({
                  borderRadius: "100%",
                  width: 10,
                  height: 10,
                  border: "2px solid",
                  backgroundColor: theme.colors.blue[4],
                  borderColor: theme.colors.blue[4],
                })}
              />
            )
          }
          return (
            <Box
              key={circle}
              sx={(theme) => ({
                borderRadius: "100%",
                width: 10,
                height: 10,
                border: "2px solid",
                borderColor: theme.colors.blue[4],
              })}
            />
          )
        })}

        <Text size="sm">{difficulty}</Text>
      </Group>

      <PopupBuilder isOpen={editOpen} setIsOpen={setEditOpen} title={`Edit ${title}`}>
        <StudyForm setIsOpen={setEditOpen} study={props} />
      </PopupBuilder>

      <DeleteStudyList item={props} setDeleteOpen={setDeleteOpen} deleteOpen={deleteOpen} />
    </Paper>
  )
}
