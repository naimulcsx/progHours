import { EditIcon, OpenLinkIcon } from "@/components/Icons"
import PopupBuilder from "@/components/PopupBuilder"
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react"
import { useState } from "react"
import DeleteHandle from "./DeleteHandle"
import HandleForm from "./HandleForm"

const HandleOJBox = ({ icon, handle, onlineJudge }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Get user online judge profile
   */
  const getProfileURL = (oj: string, handle: string) => {
    switch (oj) {
      case "Codeforces":
        return `https://codeforces.com/profile/${handle}`
      case "Toph":
        return `https://toph.co/u/${handle}`
      case "LightOJ":
        return `https://lightoj.com/user/${handle}`
      case "CodeChef":
        return `https://www.codechef.com/users/${handle}`
      default:
        return ""
    }
  }

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
          <a href={getProfileURL(onlineJudge.name, handle)} target="_blank">
            <Button
              variant={"outline"}
              border={"none"}
              bgColor="transparent"
              color={"blue.500"}
              p={0}
            >
              <OpenLinkIcon size={18} />
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
              icon={<EditIcon />}
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
