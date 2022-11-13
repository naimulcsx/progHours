import { ActionIcon, Box, Group, Paper, Text, Title, useMantineTheme } from "@mantine/core"
import { IconCaretRight, IconEdit, IconExternalLink, IconLanguage, IconNews } from "@tabler/icons"
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

export default function StudyCard(studies: Study) {
  const theme = useMantineTheme()

  const [isOpen, setIsOpen] = useState(false)

  const { title, type, language, link, difficulty, studyTime, studyDate } = studies

  return (
    <Paper p="lg" sx={{ borderRadius: theme.radius.md }}>
      <Group spacing={2}>
        <Title order={4} sx={{ color: "white" }}>
          {title}
        </Title>
        <ActionIcon variant="transparent" href={link} target="_blank" component="a" color="blue">
          <IconExternalLink size={20} />
        </ActionIcon>
      </Group>

      <Group position="apart" my="sm">
        <Text size="sm">{studyTime} minutes</Text>
        <Text size="sm"> {moment(studyDate).format("ll")}</Text>
      </Group>

      <Group position="apart">
        <Group spacing={2}>
          {type === "Video" ? <IconCaretRight size={20} /> : <IconNews size={20} />}
          <Text size="sm">{type}</Text>
        </Group>

        <Group spacing={2}>
          <IconLanguage size={20} />
          <Text size="sm">{language}</Text>
        </Group>
      </Group>

      <Group position="apart" mt="sm">
        <Group align="center" spacing="xs">
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
                    width: 14,
                    height: 14,
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
                  width: 14,
                  height: 14,
                  border: "2px solid",
                  borderColor: theme.colors.blue[4],
                })}
              />
            )
          })}

          <Text size="sm">{difficulty}</Text>
        </Group>

        <Group spacing={2}>
          <Box>
            <ActionIcon variant="transparent" color="green" onClick={() => setIsOpen(true)}>
              <IconEdit size={16} />
            </ActionIcon>
            <PopupBuilder isOpen={isOpen} setIsOpen={setIsOpen} title={`Edit ${title}`}>
              <StudyForm setIsOpen={setIsOpen} studies={studies} />
            </PopupBuilder>
          </Box>
          <DeleteStudyList item={studies} />
        </Group>
      </Group>
    </Paper>
  )
}
