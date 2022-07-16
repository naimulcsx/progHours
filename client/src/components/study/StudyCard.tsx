import { Box, Heading, Flex, IconButton } from "@chakra-ui/react"
import {
  NewspaperIcon,
  PlayIcon,
  TranslateIcon,
} from "@heroicons/react/outline"
import moment from "moment"
import { useState } from "react"
import { EditIcon } from "../Icons"
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
  const [isOpen, setIsOpen] = useState(false)

  const { title, type, language, link, difficulty, studyTime, studyDate } =
    studies

  return (
    <Box
      as="article"
      maxW="sm"
      p="5"
      borderWidth="1px"
      rounded="md"
      _hover={{ borderColor: "blue.200" }}
    >
      <Heading size="md" my="1">
        <a href={link} target={"_blank"}>
          {title}
        </a>
      </Heading>

      <Flex alignItems={"center"} my="2" justifyContent="space-between">
        <Box fontWeight={"semibold"} color="gray.500" fontSize={"sm"}>
          {studyTime} minutes
        </Box>
        <Box fontWeight={"semibold"} color="gray.500" fontSize={"sm"}>
          {moment(studyDate).format("ll")}
        </Box>
      </Flex>

      <Flex alignItems={"center"} my="2" justifyContent="space-between">
        <Flex alignItems={"center"} columnGap="4px">
          {type === "Video" ? (
            <PlayIcon className="w-4 h-4" />
          ) : (
            <NewspaperIcon className="w-4 h-4" />
          )}
          <Box fontSize={"sm"}>{type}</Box>
        </Flex>

        <Flex alignItems={"center"} columnGap="4px">
          <TranslateIcon className="w-4 h-4" />
          <Box fontSize={"sm"}>{language}</Box>
        </Flex>
      </Flex>

      <Flex alignItems={"center"} justifyContent="space-between">
        <Flex alignItems={"center"} columnGap="6px">
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
                  rounded="full"
                  bgColor={"blue.600"}
                  width={"3"}
                  height={"3"}
                />
              )
            }
            return (
              <Box
                key={circle}
                rounded="full"
                borderColor={"blue.600"}
                width={"3"}
                height={"3"}
                border="2px"
              />
            )
          })}

          <Box>{difficulty}</Box>
        </Flex>

        <Flex alignItems={"center"}>
          <Box>
            <IconButton
              aria-label="edit study button"
              variant={"outline"}
              border="none"
              color={"green.500"}
              icon={<EditIcon />}
              onClick={() => setIsOpen(true)}
            />
            <PopupBuilder
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              title={`Edit ${title}`}
            >
              <StudyForm setIsOpen={setIsOpen} studies={studies} />
            </PopupBuilder>
          </Box>

          <DeleteStudyList item={studies} />
        </Flex>
      </Flex>
    </Box>
  )
}
