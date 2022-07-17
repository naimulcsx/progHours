import PopupBuilder from "@/components/PopupBuilder"
import getOJProfileURL from "@/utils/getOJProfileUrl"
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react"
import { ExternalLinkIcon, PencilAltIcon } from "@heroicons/react/outline"
import { useState } from "react"
import DeleteHandle from "./DeleteHandle"
import HandleForm from "./HandleForm"

const HandleOJBox = ({ icon, handle, onlineJudge }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Flex
      alignItems={"start"}
      gap={"10px"}
      border="1px"
      borderColor={"gray.200"}
      borderRadius="12px"
      p={4}
    >
      <Box
        h={14}
        w={14}
        p={2}
        rounded={"full"}
        border={"1px"}
        borderColor="gray.200"
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
      >
        {icon}
      </Box>

      <Flex flexDirection={"column"} flex={1}>
        <Flex alignItems={"center"} justifyContent="space-between">
          <Box>
            <Text
              fontSize={"lg"}
              fontWeight={"semibold"}
              color={"blackAlpha.800"}
            >
              {onlineJudge.name}
            </Text>
            <Text fontSize={"sm"} color={"gray.400"}>
              {handle}
            </Text>
          </Box>
          <a href={getOJProfileURL(onlineJudge.name, handle)} target="_blank">
            <Button
              variant={"outline"}
              border={"none"}
              bgColor="transparent"
              color={"blue.300"}
              p={0}
            >
              <ExternalLinkIcon width={24} height={24} />
            </Button>
          </a>
        </Flex>
        <Flex alignItems={"center"} justifyContent="flex-end">
          <Box>
            <IconButton
              aria-label="edit handle button"
              variant={"outline"}
              border="none"
              color={"green.500"}
              icon={<PencilAltIcon width={24} height={24} />}
              onClick={() => setIsOpen(true)}
            />

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
          </Box>
          <DeleteHandle title={onlineJudge.name} id={onlineJudge.id} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default HandleOJBox
