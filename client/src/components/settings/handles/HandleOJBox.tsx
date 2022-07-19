import PopupBuilder from "@/components/PopupBuilder"
import getOJProfileURL from "@/utils/getOJProfileUrl"
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ExternalLinkIcon, PencilAltIcon } from "@heroicons/react/outline"
import { useState } from "react"
import DeleteHandle from "./DeleteHandle"
import HandleForm from "./HandleForm"

const HandleOJBox = ({ icon, handle, onlineJudge }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Flex gap="10px" p={4} bg="white" rounded="lg" shadow="base">
      <Box
        h={14}
        w={14}
        p={2}
        rounded="full"
        border="1px"
        borderColor="gray.200"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {icon}
      </Box>
      <Flex flexDirection="column" flex={1}>
        <Flex justifyContent="space-between">
          <Box>
            <Text fontSize="lg" fontWeight="semibold" color="blackAlpha.800">
              {onlineJudge.name}
            </Text>
            <Text fontSize="sm" color="gray.400">
              {handle}
            </Text>
          </Box>
          <VStack align="self-end">
            <a href={getOJProfileURL(onlineJudge.name, handle)} target="_blank">
              <Button
                variant="link"
                minW="auto"
                bgColor="transparent"
                color="blue.300"
                p={0}
              >
                <ExternalLinkIcon width={20} />
              </Button>
            </a>
            <HStack>
              <Box>
                <IconButton
                  aria-label="Edit handle button"
                  variant="link"
                  color="green.500"
                  icon={<PencilAltIcon width={20} />}
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
            </HStack>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default HandleOJBox
